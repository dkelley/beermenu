function BarCtrl($scope) {
  $scope.beers = [
                {
                    name: "Belgian Brunette",
                    brewery: "Long Trail Brewing Co",
                    abv: "6.2",
                    style: "Belgian-Style Pale Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/6aqF70/upload_lHJPgj-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                },
                {
                    name: "Belgian Brunette",
                    brewery: "Long Trail Brewing Co",
                    abv: "6.2",
                    style: "Belgian-Style Pale Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/6aqF70/upload_lHJPgj-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                },
                {
                    name: "Cariboo Genuine Draft",
                    brewery: "Pacific Western Brewery",
                    abv: "5.5",
                    style: "American-Style Lager",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/ekECwm/upload_qsJqWu-large.png"
                },
                {
                    name: "Exit 8",
                    brewery: "Flying Fish Brewing Company",
                    abv: "8.3",
                    style: "English-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/DknZZL/upload_Aw3nt8-large.png"
                },
                {
                    name: "American Brown",
                    brewery: "Reuben's Brews",
                    abv: "5.9",
                    style: "American-Style Brown Ale",
                    logo: "https://s3.amazonaws.com/brewerydbapi/beer/Nrvt1a/upload_IoLh64-large.png"
                }
            ];

	var init = function () {
		$scope.beerRows = [];
		var beerRow = [];
		var maximumGroupSize = 3;
	    angular.forEach($scope.beers, function(beer) {
	    	beerRow.push(beer);
			if(beerRow.length == maximumGroupSize) {
                    $scope.beerRows.push(beerRow);
                    beerRow = [];
                }    	
        });

        // basic setup
        $(".beerTable thead th").attr({"colspan" : maximumGroupSize});
	};

	init();            
}