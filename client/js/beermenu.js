var beerMenuApp = angular.module('beerMenuApp',['beerMenuFilters']);

var index = 0;
var rowIndex = 0;

function loadBeers(beerList, numberOfRows, numberOfColumnms){
	var beers = [];
	for (var row=0;row<numberOfRows;row++){
		for (var col=0;col< numberOfColumnms;col++){
			index++;
			console.log("loading beers", index);
			if (index >= beerList.length)
				index = 0;
			beers.push(beerList[index]);
		}
	}
	console.log("loaded beers", new Date());
	return beers;
};

function displayBeers(beers, numberOfRows, numberOfColumnms){		
	console.log(beers.length, index, numberOfRows, numberOfColumnms);
	beerRows = [];
	var beers = loadBeers(beers, numberOfRows, numberOfColumnms);
	var beerRow = [];
    angular.forEach(beers, function(beer) {
    	beerRow.push(beer);
		if(beerRow.length == numberOfColumnms) {
			if (beerRows.length < numberOfRows){
				console.log("adding", beer.name);
            	beerRows.push(beerRow);
            	beerRow = [];
            }
        }
    });
    if (beerRow.length > 0 && beerRows.length < numberOfRows)
    	beerRows.push(beerRow);
    return beerRows;
}   

function BeerMenuCtrl($scope, $http, $timeout) {
	$scope.predicate = '-name';
	
	$scope.numberOfColumnms = 3;
	$scope.numberOfRows = 4;

	var init = function () {
        // basic setup
        $(".beerTable thead th").attr({"colspan" : $scope.numberOfColumnms-1});
        $("td.bottomSpacer").attr({"colspan" : $scope.numberOfColumnms});
        $("td.bottomSpacer").attr({"height" : 100});        
	};

	$http.get('data/beers.json').success(function(data) {
		$scope.beers = data.onTap;
		$scope.beerRows = displayBeers($scope.beers, $scope.numberOfRows, $scope.numberOfColumnms);
		setInterval(function(){
        	$scope.$apply(function() {
            	$scope.beerRows = displayBeers($scope.beers, $scope.numberOfRows, $scope.numberOfColumnms);
        	});
    	}, 6000);		
	});

	init();
}

beerMenuApp.controller('BeerMenuCtrl', BeerMenuCtrl);

$(function() {
	// 1 Hour = 3600000 Milliseconds
	var t = setTimeout(function(){location.reload()},3600000);
	if (console)
		console.log("page reloaded")
});

