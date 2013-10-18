angular.module('beerMenu.filters', []).filter('imageexists', function() {
  return function(input) {
  	if (input)
  		return input;
  	else{
  		var randomnumber=Math.floor(Math.random()*3)
  		return "img/labels/beerlabel" + randomnumber + ".jpg";
  	}
  };
});