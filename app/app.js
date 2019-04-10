'use strict';

// Requiring module's CSS
require('angular-material/angular-material.min.css');

// Requiring angular-related modules that will spit things in the global scope
require('angular');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-route');

// Making some modules global for the custom scripts to consume
var d3 = require('d3');
window.d3 = d3;
var numeric = require('numeric');
window.numeric = numeric;

// Requiring some graphology libraries we are going to make global for the user
var graphology = require('graphology');

graphology.library = require('graphology-library/browser');
window.graphology = graphology;
window.Graph = graphology;

var randomLayout = graphology.library.layout.random;

var forceAtlas2Layout = graphology.library.layoutForceAtlas2;
window.layout = {
  random: randomLayout,
  forceAtlas2: forceAtlas2Layout
};

window.ForceAtlas2Layout = graphology.library.FA2Layout;

window.louvain = graphology.library.communitiesLouvain;

// Requiring sigma
window.SigmaWebGLRenderer = require('sigma/renderers/webgl').default;

// Requiring own modules
require('./view_home/home.js');

// Declare app level module which depends on views, and components
angular.module('gentestnet', [
  'ngRoute',
  'ngMaterial',
  'gentestnet.view_home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

// Filters
.filter('number', function() {
  return function(d) {
    return +d
  }
})
.filter('percent', function() {
  return function(d) {
    return Math.round(+d*100)+'%'
  }
})

// Services


// Directives
.directive('sigmaNetwork', function(
  $timeout
){
  return {
    restrict: 'E'
    ,templateUrl: 'sigmaNetwork.html'
    ,scope: {
      g: '='
    }
    ,link: function($scope, el, attrs) {
      $scope.$watch('g', function(){
        $timeout(update)
      })

      var renderer, graph
      $scope.layout

      $scope.$on("$destroy", function(){
        if ($scope.layout) {
          $scope.layout.kill()
        }
        if (renderer) {
          renderer.kill()
        }
      })

      function update() {

        // Parameters
        var DEFAULT_NODE_COLOR = '#808080';
        var DEFAULT_EDGE_COLOR = '#ccc';

        var MIN_NODE_SIZE = 5;
        var MAX_NODE_SIZE = 10;

        var FA2_SETTINGS = {
          barnesHutOptimize: $scope.g.order > 500,
          strongGravityMode: false,
          gravity: 0.0000001,
          scalingRatio: 10,
          slowDown: 1 + Math.log($scope.g.order)
        };

        var CATEGORY = null;
        var COLORS = {
          e: '#c75a93',
          q: '#60a862'
        };

        // NOTE: use `true` if you don't want to "pollute" your graph with
        // visual attributes.
        var CLONE = false;

        // Cloning & decorating
        graph = CLONE ? $scope.g.copy() : $scope.g;

        graph.nodes().forEach(function(node) {

          // Labels
          graph.nodes().forEach(function(nid){
            // graph.setNodeAttribute(nid, 'label', graph.getNodeAttribute(nid, 'type') || '')
            graph.setNodeAttribute(nid, 'label', nid)
          })

          // Color
          graph.nodes().forEach(function(nid){
            var type = graph.getNodeAttribute(nid, 'type')
            if (type) {
              graph.setNodeAttribute(nid, 'color', hashToColor(type))
            } else {
              graph.setNodeAttribute(nid, 'color', DEFAULT_NODE_COLOR)
            }
          })
          

          // Size
          graph.updateNodeAttribute(node, 'size', function(size) {
            return 1;
            // return size || graph.degree(node);
          });

          // Position
          function randomPositionIfNeeded(x) {
            return typeof x === 'number' ? x : Math.random();
          }

          graph.updateNodeAttribute(node, 'x', randomPositionIfNeeded);
          graph.updateNodeAttribute(node, 'y', randomPositionIfNeeded);
        });

        graph.edges().forEach(function(edge) {

          // Color
          graph.updateEdgeAttribute(edge, 'color', function(color) {
            return color || DEFAULT_EDGE_COLOR;
          });
        });

        // Scales
        var sizes = graph.nodes().map(function(node) {
          return graph.getNodeAttribute(node, 'size');
        });

        var nodeScale = d3.scaleLinear()
          .domain([Math.min.apply(null, sizes), Math.max.apply(null, sizes)])
          .range([MIN_NODE_SIZE, MAX_NODE_SIZE]);

        graph.nodes().forEach(function(node) {
          graph.updateNodeAttribute(node, 'size', nodeScale);
        });

        // Rendering
        var playground = document.getElementById('playground')

        var container = document.getElementById('container');

        renderer = new SigmaWebGLRenderer(graph, container);
        var camera = renderer.getCamera();

        // Layout
        $scope.layout = new ForceAtlas2Layout(graph, {settings: FA2_SETTINGS});
        $scope.layout.start();

        // Padding
        document.querySelectorAll('#playground, #playground > #container, #playground > #container > canvas').forEach(function(dom) {
          dom.style.padding = '0px';
        });

        // Buttons
        $scope.stopLayout = function() {
          if ($scope.layout === undefined) { return }
          $scope.layout.stop()
        }

        $scope.startLayout = function() {
          if ($scope.layout === undefined) { return }
          $scope.layout.start()
        }

        $scope.resetCamera = function() {
          camera.animatedReset();
        }

        $scope.download = function () {
          var gexf = graphology.library.gexf;
          var xml = gexf.write(graph);

          var blob = new Blob([xml], {'type':'text/gexf+xml;charset=utf-8'});
          saveAs(blob, graph.getAttribute('name') + ".gexf");
        }


      }
    }
  }

  function hashToColor(text) {
    var seed1 = hashToNumber(text)
    var seed2 = hashToNumber(''+seed1)
    var seed3 = hashToNumber(''+seed2)
    var hExtent = [0, 360]
    var sExtent = [0.7, 0.8]
    var lExtent = [0.5, 0.7]
    return d3.color(d3.hsl(
      hExtent[0]+seed1*(hExtent[1]-hExtent[0]),
      sExtent[0]+seed2*(sExtent[1]-sExtent[0]),
      lExtent[0]+seed3*(lExtent[1]-lExtent[0])
    )).toString()
  }

  function hashToNumber(text) {
    var seed = Math.abs((Array.from(text+text+text+text+text+text+text+text+text, c => c.charCodeAt(0)).reduce((a, b) => ((a << 5) - a) + b) | 0) & 0xffffffff) / Math.pow(2, 32) 
    seed = Math.pow(1/seed, Math.PI)
    return seed%1000 / 1000
  }
})

