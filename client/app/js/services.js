'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('beerMenu.services', []).
  value('version', '0.1');


angular.module('beerMenu.services').provider('beerListService', function() {

	var that = this;
	this.cache = {};


	this.$get = function($http) {
		return {
			barData: function(){
				return {};
			},
			saveBar: function(bar, onSuccess){
				console.log("saving ", bar.name);
				$http.put('http://beermenu.ginger/app/' + bar.url, bar).success(function(data) {
					console.log("saved bar");
					//that.cache[bar.name] = data;
					if (onSuccess)
						onSuccess(data);
			    });
			},			
			loadBar: function(barName, onSuccess){
				if (that.cache[barName] == null){
					console.log("loading ", barName);
					$http.get('http://localhost:8080/' + barName).success(function(data) {
						console.log("loaded bar", data.name);
						that.cache[barName] = data;
						onSuccess(data);
				    });
				}else{
					console.log("cached ", that.cache[barName]);
					onSuccess(that.cache[barName])	;
				}
			},
			addBeer: function(bar, beer, onSuccess){
				console.log("adding ", beer.name," from ", bar.name);
				bar.onTap.push(beer);
				return bar;
			},			
			removeBeer: function(bar, beer, onSuccess){
				console.log("removing ", beer.name," from ", bar.name);
				for (var i = bar.onTap.length - 1; i >= 0; i--) {
					if (bar.onTap[i].id == beer.id){
						bar.onTap.splice(i,1);
						return bar;
					}
				};
				return bar;
			},			
			loadRows: function(bar, numberOfColumns, beers){
				var row = [];
				var beerRows = [];
				console.log("building " + numberOfColumns);
				while(beers.length > 0){
					var beer = beers.pop();
					if (beer && !beer.labels)
						beer.labels = {};
					if (beer && !beer.labels.large){
				  		var randomnumber=Math.floor(Math.random()*3)
	  					beer.labels.large = "img/labels/beerlabel" + randomnumber + ".jpg";
					}
					row.push(beer);
					if (row.length == numberOfColumns){
						beerRows.push(row);
						row = [];
					}
				}
				if (row.length > 0){
					beerRows.push(row);
				}
				console.log("beerRows " + beerRows.length);
				return beerRows;
			},
			search: function(term, onSuccess){
				console.log("searching for", term);
				$http.get('http://localhost:8080/search/' + term).success(function(data) {
					console.log("found ", data.length);
					onSuccess(data);
			    });
			}
		}
	};

	// var rotateBeers = function(){
	// 	var row = $scope.beerRows.pop();
	// 	$scope.beerRows.unshift(row);
	// 	$timeout(rotateBeers, 3000);
	// }


		//$scope.beerRows = rowList.slice(0, rowIndex+=numberOfRows);
		// $scope.beerRows = displayBeers($scope.beers, $scope.numberOfRows, $scope.numberOfColumnms);
		// $scope.beerRows = beerList;
	 //    $timeout(rotateBeers, 5000);
		// init();

    this.setUrl = function(name) {
        this.name = name;
    };

});