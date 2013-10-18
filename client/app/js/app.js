'use strict';


// Declare app level module which depends on filters, and services
angular.module('beerMenuApp', [
  'ngRoute',
  'ngAnimate',
  'beerMenu.filters',
  'beerMenu.services',
  'beerMenu.directives',
  'beerMenu.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beerlist/:page', {templateUrl: 'partials/beerlist.html', controller: 'BeerList'});
  $routeProvider.when('/specials/:page', {templateUrl: 'partials/partial2.html', controller: 'Specials'});
  $routeProvider.otherwise({redirectTo: '/beerlist/1'});
}]);


