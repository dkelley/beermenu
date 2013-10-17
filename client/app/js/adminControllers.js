var beerMenuAdminApp = angular.module('beerMenuAdminApp',['beerMenuFilters']);
beerMenuAdminApp.controller('BeerMenuAdminCtrl', BeerMenuAdminCtrl);

function BeerMenuAdminCtrl($scope, $http) {
  //$http.get('http://beermenu.ginger:8080/kellysbrynmawr').success(function(data) {
  $http.get('data/beers.json').success(function(data) {
  	console.log('success');
    $scope.beers = data;
  });
 
  $scope.orderProp = 'age';

}



