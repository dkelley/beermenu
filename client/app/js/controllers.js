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
  		$scope.beerRows = beerListService.loadRows(bar, 2, beers);
      // $(".beerTable thead th").attr({"colspan" : numberOfColumns-1});
      $("td.bottomSpacer").attr({"colspan" : numberOfColumns});
      $("td.bottomSpacer").attr({"height" : 100});

      // start rotating the beers
      var yIndex = -1;

      var rotate = function(section){
        $('body').scrollTo('#beerRow'+section, 1500, {"offset" : -85 });
          if (yIndex !=  window.scrollY) {
            var timeoutCount = 3000;
            if (yIndex == -1)
              timeoutCount = 6000;
            $timeout(function(){rotate(++section)}, timeoutCount);
          }else{
            yIndex = -1;
            rotate(0);
          }
          yIndex =  window.scrollY;
  		};	
      $timeout(function(){rotate(1)}, 3000);
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
        beerListService.saveBar($scope.bar);
      }

    });
  }])  
  .controller('AdminBeerSearch', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
    beerListService.loadBar($routeParams.barUrl, function(bar){
      $scope.bar = bar;

      $scope.message = "This is an alert";
      $scope.beerResults = [];

      $scope.search = function(){
        console.log("search:", $scope.term);
        beerListService.search($scope.term, function(results){
          var beers = results.sort(function(a,b){
            return a.name < b.name
          });
          $scope.beerResults = beers;
        });
      }

      $scope.activateBeer = function (beer){
        $scope.bar = beerListService.addBeer($scope.bar, beer);
        beerListService.saveBar($scope.bar, function(){
          $scope.message = "Success saving beer";
        });
      }    
    });
  }])
  .controller('AdminBeerMenu', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
    $scope.baseUrl = beerListService.barData.baseUrl;
    console.log('AdminBeerMenu', $scope.baseUrl);
    $scope.user = {"username":"dkelley"};
    
  }]);