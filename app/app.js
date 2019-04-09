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

