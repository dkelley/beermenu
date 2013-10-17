'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'beerMenu.filters',
  'beerMenu.services',
  'beerMenu.directives',
  'beerMenu.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beers/{pageNumber}', {templateUrl: 'partials/beer.html', controller: 'MyCtrl1'});
  $routeProvider.when('/specials/{pageNumber}', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
