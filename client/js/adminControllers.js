var beerMenuAdminApp = angular.module('beerMenuAdminApp',['beerMenuFilters']);
beerMenuAdminApp.controller('BeerMenuAdminCtrl', BeerMenuAdminCtrl);

function BeerMenuAdminCtrl($scope, $http) {
  $http.get('http:localhost:8080/kellysbrynmawr').success(function(data) {
    $scope.beers = data;
  });
 
  $scope.orderProp = 'age';

}



