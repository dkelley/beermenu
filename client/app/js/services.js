'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('beerMenu.services', []).
  value('version', '0.1');


angular.module('beerMenu.services').provider('beerListService', function() {

	this.name = 'Sample';

	this.$get = function($http) {
		var name = this.name;
		return {
			loadBar: function(barName, onSuccess){
				$http.get('data/'+ barName + '.json').success(function(data) {
					console.log("loaded bar", data.name);
					onSuccess(data);
			    });
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