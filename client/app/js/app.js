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
  $routeProvider.when('/:bar/beerlist', {templateUrl: 'partials/beerlist.html', controller: 'BeerList'});
  $routeProvider.when('/:bar/specials', {templateUrl: 'partials/specials.html', controller: 'Specials'});
  $routeProvider.otherwise({redirectTo: '/kellysbrynmawr/beerlist'});
}]);


angular.module('beerMenuAdmin', [
  'ngRoute',
  'ngAnimate',
  'beerMenu.filters',
  'beerMenu.services',
  'beerMenu.directives',
  'beerMenu.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:barUrl/list', {templateUrl: 'partials/admin/list.html', controller: 'AdminBeerController'});
  $routeProvider.when('/:barUrl/search', {templateUrl: 'partials/admin/search.html', controller: 'AdminBeerSearch'});
  $routeProvider.when('/:barUrl/preferences', {templateUrl: 'partials/admin/search.html', controller: 'AdminBeerController'});
  $routeProvider.when('/:barUrl/logout', {templateUrl: 'partials/admin/search.html', controller: 'AdminBeerController'});
  $routeProvider.otherwise({redirectTo: '/kellysbrynmawr/list'});
}]);

