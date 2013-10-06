var beerMenuAdminApp = angular.module('beerMenuAdminApp',['beerMenuFilters']);
beerMenuAdminApp.controller('BeerMenuAdminCtrl', BeerMenuAdminCtrl);

function BeerMenuAdminCtrl($scope, $http) {
  $http.get('data/beers.json').success(function(data) {
    $scope.beers = data;
  });
 
  $scope.orderProp = 'age';

}

