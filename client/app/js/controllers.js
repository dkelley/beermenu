'use strict';

/* Controllers */
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

var beerMenuApp = angular.module('beerMenu.controllers', []);

beerMenuApp.controller('BeerList', ['$scope', '$http', '$timeout', '$routeParams', '$route', 'beerListService', function($scope, $http, $timeout, $routeParams, $route, beerListService){
  	beerListService.loadBar($routeParams.bar, function(bar){
	  	console.log("page:" + $routeParams.page);
    	console.log("bar:" + $routeParams.bar);
    	$scope.hasSpecial = false;    
  		$scope.bar = bar;
  		var numberOfColumns = 1 //bar.displaySettings.numberOfColumns ? bar.displaySettings.numberOfColumns : 1 //defaultNumberOfColumnms;

  		var beers = bar.onTap;
  		beers = beers.sort(function(a,b){
  			return a.name < b.name
  		});
  		$scope.beerRows = beerListService.loadRows(bar, numberOfColumns, beers);
      // $(".beerTable thead th").attr({"colspan" : numberOfColumns-1});
      $("td.bottomSpacer").attr({"colspan" : numberOfColumns});
      $("td.bottomSpacer").attr({"height" : 100});
      $("td.beer").attr({"width" : 100/numberOfColumns});

      // start rotating the beers
      var yIndex = -1;

      var updateSpecial = function(indexDayOfWeek){
        var dayOfWeek = weekday[indexDayOfWeek];

        if(angular.isDefined(bar.specials && bar.specials[dayOfWeek])){
          $scope.specialDetails = bar.specials[dayOfWeek];
          $scope.dayOfWeek = dayOfWeek + "s";
          $scope.hasSpecial = true;
        }else{
          $scope.hasSpecial = false;
        }
        if (indexDayOfWeek>7)
          indexDayOfWeek=0;
        $timeout(function(){updateSpecial(++indexDayOfWeek)}, 15000);
      };

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
      $timeout(function(){rotate(0)}, 3000);
      $timeout(function(){updateSpecial(1)}, 3000);
  	 });
  }]);


// Admin app controllers
beerMenuApp.controller('AdminBeerController', ['$scope', '$http', '$routeParams', '$route', 'beerListService', function($scope, $http, $routeParams, $route, beerListService){
  beerListService.barData.baseUrl = $routeParams.barUrl;
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
    $scope.user = {"username":"dkelley"};
    
  }]);
