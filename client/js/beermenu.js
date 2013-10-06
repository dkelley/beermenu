function BeerMenuCtrl($scope, $http) {
  $http.get('data/beers.json').success(function(data) {
    $scope.beers = data;
  });

	$scope.predicate = '-name';

	var index = 0;
	var numberOfColumnms = 3;
	var numberOfRows = 4;

	function loadBeers(){
		var beers = [];
		for (var row=0;row<numberOfRows;row++){
			for (var col=0;col< numberOfColumnms;col++){
				index++;
				console.log("loading beers", index);
				if (index >= $scope.beers.onTap.length)
					index = 0;
				beers.push($scope.beers.onTap[index]);
			}
		}
		console.log("loaded beers");
		return beers;
	};

	function displayBeers(beers){		
		$scope.beerRows = [];
		var beers = loadBeers();
		var beerRow = [];
	    angular.forEach(beers, function(beer) {
	    	beerRow.push(beer);
			if(beerRow.length == numberOfColumnms) {
				if ($scope.beerRows.length < numberOfRows){
                	$scope.beerRows.push(beerRow);
                	beerRow = [];
                }
            }
        });
        if (beerRow.length > 0 && $scope.beerRows.length < numberOfRows)
        	$scope.beerRows.push(beerRow);
    }    

	var init = function () {
		displayBeers();
        // basic setup
        $(".beerTable thead th").attr({"colspan" : numberOfColumnms-1});
        $("td.bottomSpacer").attr({"colspan" : numberOfColumnms});
        $("td.bottomSpacer").attr({"height" : 100});
	};

	// factory('time', function($timeout) {
	//     (function refreshScreen() {
	//     	// $scope.$apply();
	//      //  time.now = new Date().toString();
	//       $timeout(refreshScreen, 1000);
	//       // How will I write this using setInterval() ?
	//     })();
	//   });

	init();

		// rotate through beers
	//setInterval(, 10000);	

}
var beerMenuApp = angular.module('beerMenuApp',['beerMenuFilters']);

beerMenuApp.factory('timerReload', function($timeout) {
    (function refreshScreen() {
	  	displayBeers();
		$timeout(displayBeers, 2000);
      })();
  });

beerMenuApp.controller('BeerMenuCtrl', BeerMenuCtrl);


//angular.module('timerModule', []).
  // Declare new object call time,
  // which will be available for injection
  


$(function() {
	var div = $("body");
	// setInterval(function(){
	//     var pos = div.scrollTop();
	//     div.animate({ scrollTop: pos + 100 });
	// }, 3000);
	// function getDocHeight() {
	//     var D = document;
	//     return Math.max(
	//         Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
	//         Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
	//         Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	//     );
	// }
	// $(window).scroll(function() {
 //       if($(window).scrollTop() + $(window).height() == getDocHeight()) {
 //          $("html, body").animate({ scrollTop: 0 }, "slow");
 //       }
 //   });

	// 1 Hour = 3600000 Milliseconds
	var t = setTimeout(function(){location.reload()},3600000);
	if (console)
		console.log("page reloaded")
});

