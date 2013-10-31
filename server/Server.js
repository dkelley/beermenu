var restify = require('restify');
var mongoose = require('mongoose');
var http = require("http");

var schemas = require('./models/index')(mongoose);


var server = restify.createServer({
  name: 'beermenu',
});

function search(req, res, next) {
   	//res.send('search brewery for ' + req.params.name);

   	var baseSearchUrl = "http://api.brewerydb.com/v2/search?type=beer&withBreweries=Y&key=a7ce9c08e84cecee7b2ca2f680e9494a&q=";
	console.log("URL ", baseSearchUrl + req.params.name);

	var request = http.get(baseSearchUrl + req.params.name, function (response) {
		var body = '';

	    response.on('data', function(chunk) {
	        body += chunk;
	    });

	    response.on('end', function() {
	        var beerResults = JSON.parse(body)
			console.log('Found ' + beerResults.totalResults);
			if (beerResults.totalResults && beerResults.totalResults > 0)
				res.send(beerResults.data);		        
	    });
  	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}

function searchTest(req, res, next) {
	var request = http.get('http://beermenu.ginger/data/beers.json', function (response) {
		var body = '';

	    response.on('data', function(chunk) {
	        body += chunk;
	    });

	    response.on('end', function() {
	        var bar = JSON.parse(body)
			res.send(bar);		        
	    });
  	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	}); 	
 }

function loadBar(req, res, next) {
	mongoose.connect('mongodb://dkelley:pa55w0rd@paulo.mongohq.com:10019/beermenu');

	schemas.Bar.find({"url": req.params.name}, function(err, documents) {
		console.log("found " + documents.length);
		if (!err && documents.length > 0)
  			res.send(documents[0]);
  		else
  			res.send('no bar found for ' + req.params.name);
	});
	return next();
 }

 function loadBarTest(req, res, next) {
	var request = http.get('http://beermenu.ginger/data/'+ req.params.name + '.json', function (response) {
		var body = '';

	    response.on('data', function(chunk) {
	        body += chunk;
	    });

	    response.on('end', function() {
	        var bar = JSON.parse(body)
			res.send(bar);		        
	    });
  	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	}); 	
 }

// function searchForBeer(req, res, next) { 		
//  	var request = http.get('http://beermenu.ginger/app/search/' + $scope.term, function (response) {
// 		var body = '';

// 	    response.on('data', function(chunk) {
// 	        body += chunk;
// 	    });

// 	    response.on('end', function() {
// 	        var bar = JSON.parse(body)
// 			res.send(bar);		        
// 	    });
//   	}).on('error', function(e) {
//   		console.log("Got error: " + e.message);
// 	}); 	     
//  } 

			

server.post('/save/:name', function(req, res, next) {
	console.log("saving %s", req.params.name);
	console.log("schemas", schemas);
	console.log("bar", schemas.Bar);
	var bar = new schemas.Bar({name: req.params.name});
	console.log("created %s", bar);
	bar.save(function(error, bar){
		console.log("callback", error);
		if (!error)
		   return res.send(bar);
		else
			console.log(error);
	});
   	return next();
});	

// setup our server
server.get('/:name', loadBarTest);
server.get('/search/:name', searchTest);
console.log("starting server");
server.use(restify.CORS());
server.use(restify.fullResponse());
server.listen(8080);