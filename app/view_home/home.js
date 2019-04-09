'use strict';

angular.module('gentestnet.view_home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view_home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope'
, function($scope) {
  var gexf = graphology.library.gexf;
  console.log("Loaded")

}])
