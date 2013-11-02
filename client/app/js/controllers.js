'use strict';

/* Controllers */
var beerMenuApp = angular.module('beerMenu.controllers', []);

beerMenuApp.controller('BeerList', ['$scope', '$http', '$timeout', '$routeParams', '$route', 'beerListService', function($scope, $http, $timeout, $routeParams, $route, beerListService){
  	console.log("page:" + $routeParams.page);
    console.log("bar:" + $routeParams.bar);
  	beerListService.loadBar($routeParams.bar, function(bar){
  		$scope.bar = bar;
  		console.log("Found " + bar.onTap.length + " beers");
  		var numberOfColumns = bar.displaySettings.numberOfColumns ? bar.displaySettings.numberOfColumns : defaultNumberOfColumnms;

  		var beers = bar.onTap;
  		beers = beers.sort(function(a,b){
  			return a.name < b.name
  		});
  		$scope.beerRows = beerListService.loadRows(bar, numberOfColumns, beers);
      $(".beerTable thead th").attr({"colspan" : numberOfColumns-1});
      $("td.bottomSpacer").attr({"colspan" : numberOfColumns});
      $("td.bottomSpacer").attr({"height" : 100});

      // start rotating the beers
      var rotate = function(){
  			var row = $scope.beerRows.pop();
  			$scope.beerRows.unshift(row);
  			$timeout(rotate, 5000);
  		};	
      $timeout(rotate, 5000);
  	 });
  }]);


// Admin app controllers
beerMenuApp.controller('AdminBeerController', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
  beerListService.barData.baseUrl = $routeParams.barUrl;
  console.log("AdminBeerController:" , beerListService.barData.baseUrl);
}]);

beerMenuApp.controller('AdminBeerList', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
    beerListService.loadBar($routeParams.barUrl, function(bar){
      $scope.bar = bar;

      var beers = bar.onTap;
      beers = beers.sort(function(a,b){
        return a.name < b.name
      });
      $scope.beers = beers;

      $scope.removeBeer = function(beer){
        $scope.bar = beerListService.removeBeer($scope.bar, beer);
      }

    });
  }])  
  .controller('AdminBeerSearch', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
    beerListService.loadBar($routeParams.barUrl, function(bar){
      $scope.bar = bar;

      $scope.search = function(){
        beerListService.search($scope.term, function(results){
          var beers = results.sort(function(a,b){
            return a.name < b.name
          });
          $scope.beerResults = beers;
        });
      }

      $scope.activateBeer = function (beer){
        $scope.bar = beerListService.addBeer($scope.bar, beer);
      }    
    });
  }])
  .controller('AdminBeerMenu', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
    $scope.baseUrl = beerListService.barData.baseUrl;
    console.log('AdminBeerMenu', $scope.baseUrl);
    $scope.user = {"username":"dkelley"};
    
  }]);