var restify = require('restify');
var mongoose = require('mongoose');
var http = require("http");

var baseUrl = 'http://beermenu.ginger/';

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
	var request = http.get(baseUrl + 'data/beers.json', function (response) {
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
	schemas.Bar.findOne	({"url": req.params.name}, function (err, doc) {
		if (!err){
			console.log("found " + doc.name);
  			res.send(doc);
		}
  		else
  			res.send({"error": 'no bar found for ' + req.params.name});
	});
	return next();
 }

function updateBar(req, res, next) {
	schemas.Bar.findOne({"url": req.params.name}, function (err, doc) {
		var beers = req.body.onTap;
  		doc.set({"onTap": beers});
	  	doc.save(function(error, bar){
			if (!error)
			   return res.send(doc);
			else
				console.log(error);		
			return next();
		});
	});
}

function saveBar(req, res, next) {
	console.log("1 updating %s", req.params.name);
	var bar = new schemas.Bar(req.body);
	bar.save(function(error, bar){
		if (!error)
		   return res.send(bar);
		else
			console.log(error);
	});	
	return next();
 }

 function loadBarTest(req, res, next) {
 	console.log("loadbar testing");
 	//http://beermenu.ginger/
 	console.log("loading ", baseUrl + 'data/'+ req.params.name + '.json');
	var request = http.get(baseUrl + 'data/'+ req.params.name + '.json', function (response) {
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


//mongoose.connect('mongodb://dkelley:pa55w0rd@paulo.mongohq.com:10019/beermenu');


// setup our server
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser({ mapParams: true }));
//server.use(restify.bodyParser());

server.get('/:name', loadBarTest);
server.get('/search/:name', search);
server.put('/:name', updateBar);
server.post('/:name', saveBar);
console.log("starting server");
server.listen(8080);
