var restify = require('restify');
var mongoose = require('mongoose');
var http = require("http");

//var baseUrl = 'http://localhost:8888/beermenu/client/app';
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


	schemas.Bar.find({"url": req.params.name}, function(err, documents) {
		console.log("found " + documents.length);
		if (!err && documents.length > 0)
  			res.send(documents[0]);
  		else
  			res.send('no bar found for ' + req.params.name);
	});
	//mongoose.connection.close();
	//mongoose.disconnect();
	return next();
 }

function updateBar(req, res, next) {
	schemas.Bar.findOne({"url": req.params.name}, function (err, doc) {
		console.log(doc.onTap);
		var beers = req.body.onTap;
		console.log("beers", beers);
  		doc.set({"onTap": beers});
  		console.log("result:", doc);
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


mongoose.connect('mongodb://dkelley:pa55w0rd@paulo.mongohq.com:10019/beermenu');


// setup our server
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser({ mapParams: true }));
//server.use(restify.bodyParser());

server.get('/:name', loadBar);
server.get('/search/:name', search);
server.put('/:name', updateBar);
server.post('/:name', saveBar);
console.log("starting server");
server.listen(8080);
