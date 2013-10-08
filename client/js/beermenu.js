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
	var numberOfColumnms = 3;
	var numberOfRows = 4;
	var rowIndex = 0;
	var rowList = [];

	$scope.init = function () {
        // basic setup
        $(".beerTable thead th").attr({"colspan" : $scope.numberOfColumnms-1});
        $("td.bottomSpacer").attr({"colspan" : $scope.numberOfColumnms});
        $("td.bottomSpacer").attr({"height" : 100});        
	};

	$scope.nextRow = function(beers, numberOfColumnms){
		var row = [];
		for (var col=0;col<numberOfColumnms;col++){
			if (beers.length > 0){
				var beer = beers.pop();
				row.push(beer);
			}			
		}
		return row;
	};

	$http.get('data/beers.json').success(function(data) {
		console.log("load beers");
		var beers = data.onTap;
		beers.sort(function(a,b){
			return a.name < b.name
		});
		numberOfColumnms = data.displaySettings.numberOfColumns;
		numberOfRows = data.displaySettings.numberOfRows;
		var row = $scope.nextRow(beers, numberOfColumnms);
		while(row.length > 0){
			rowList.push(row);
			row = $scope.nextRow(beers, numberOfColumnms);
		}
		$scope.beerRows = rowList.slice(0, rowIndex+=numberOfRows);
		// $scope.beerRows = displayBeers($scope.beers, $scope.numberOfRows, $scope.numberOfColumnms);
		setInterval(function(){
        	$scope.$apply(function() {  
        		var row = rowList.slice(rowIndex, rowIndex+1);      		
        		var tempArray = $scope.beerRows;
				tempArray.unshift(row);
				tempArray.pop();
				$scope.beerRows = tempArray;
				if (rowIndex>=rowList.length)
					rowIndex=0;
				else
					rowIndex++;
        	});
    	}, 3000);		
	});

	$scope.init();
}

beerMenuApp.controller('BeerMenuCtrl', BeerMenuCtrl);

$(function() {
	// 1 Hour = 3600000 Milliseconds
	var t = setTimeout(function(){location.reload()},3600000);
	if (console)
		console.log("page reloaded")
});

