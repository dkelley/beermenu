'use strict';

/* Controllers */
angular.module('beerMenu.controllers', []).
  controller('BeerList', ['$scope', '$http', '$timeout', '$routeParams', '$route', 'beerListService', function($scope, $http, $timeout, $routeParams, $route, beerListService){
  	console.log("page:" + $routeParams.page);
  	beerListService.loadBar('kellys', function(bar){
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
  }])
  .controller('Specials', [function() {

  }])
  .controller('Admin', [function() {

  }]);