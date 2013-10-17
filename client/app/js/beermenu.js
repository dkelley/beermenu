var beerMenuApp = angular.module('beerMenuApp',['beerMenuFilters','ngAnimate']);

// var index = 0;
// var rowIndex = 0;

// function loadBeers(beerList, numberOfRows, numberOfColumnms){
// 	var beers = [];
// 	for (var row=0;row<numberOfRows;row++){
// 		for (var col=0;col< numberOfColumnms;col++){
// 			index++;
// 			console.log("loading beers", index);
// 			if (index >= beerList.length)
// 				index = 0;
// 			beers.push(beerList[index]);
// 		}
// 	}
// 	console.log("loaded beers", new Date());
// 	return beers;
// };

// function displayBeers(beers, numberOfRows, numberOfColumnms){		
// 	console.log(beers.length, index, numberOfRows, numberOfColumnms);
// 	beerRows = [];
// 	var beers = loadBeers(beers, numberOfRows, numberOfColumnms);
// 	var beerRow = [];
//     angular.forEach(beers, function(beer) {
//     	beerRow.push(beer);
// 		if(beerRow.length == numberOfColumnms) {
// 			if (beerRows.length < numberOfRows){
// 				console.log("adding", beer.name);
//             	beerRows.push(beerRow);
//             	beerRow = [];
//             }
//         }
//     });
//     if (beerRow.length > 0 && beerRows.length < numberOfRows)
//     	beerRows.push(beerRow);
//     return beerRows;
// }   

function BeerMenuCtrl($scope, $http, $timeout) {
	$scope.predicate = '-name';
	$scope.beerRows = [];
	var beerList = [];
	var defaultNumberOfColumnms = 3;

	var init = function () {
        // basic setup
        $(".beerTable thead th").attr({"colspan" : numberOfColumnms-1});
        $("td.bottomSpacer").attr({"colspan" : numberOfColumnms});
        $("td.bottomSpacer").attr({"height" : 100});        
	};

	var nextRow = function(beers, numberOfColumnms){
		var row = [];
		for (var col=0;col<numberOfColumnms;col++){
			if (beers.length > 0){
				var beer = beers.pop();
				if (beer && !beer.labels)
					beer.labels = {};
				if (beer && !beer.labels.large){
			  		var randomnumber=Math.floor(Math.random()*3)
  					beer.labels.large = "img/labels/beerlabel" + randomnumber + ".jpg";
				}
				row.push(beer);
			}			
		}
		return row;
	};

	var rotateBeers = function(){
		var row = $scope.beerRows.pop();
		$scope.beerRows.unshift(row);
		$timeout(rotateBeers, 3000);
	}

	$http.get('data/beers.json').success(function(data) {
		console.log("loaded beers");
		var beers = data.onTap;
		beers.sort(function(a,b){
			return a.name < b.name
		});
		numberOfColumnms = data.displaySettings.numberOfColumns ? data.displaySettings.numberOfColumns : defaultNumberOfColumnms;
		// numberOfRows = data.displaySettings.numberOfRows;
		// console.log("settings", data.displaySettings);
		// console.log("numberOfRows", numberOfRows);
		var row = nextRow(beers, numberOfColumnms);

		while(row.length > 0){
			beerList.push(row);
			row = nextRow(beers, numberOfColumnms);
		}
		//$scope.beerRows = rowList.slice(0, rowIndex+=numberOfRows);
		// $scope.beerRows = displayBeers($scope.beers, $scope.numberOfRows, $scope.numberOfColumnms);
		$scope.beerRows = beerList;
	    $timeout(rotateBeers, 5000);
		init();		
    });

}

beerMenuApp.controller('BeerMenuCtrl', BeerMenuCtrl);

$(function() {
	// 1 Hour = 3600000 Milliseconds
	var t = setTimeout(function(){location.reload()},3600000);
	if (console)
		console.log("page reloaded")
});

