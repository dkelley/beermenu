var restify = require('restify');
var mongoose = require('mongoose');

var schemas = require('./models/index')(mongoose);

mongoose.connect('mongodb://dkelley:pa55w0rd@paulo.mongohq.com:10019/beermenu');

var server = restify.createServer({
  name: 'beermenu',
});

function search(req, res, next) {
   res.send('search brewery for ' + req.params.name);
   return next();
 }

server.get('/save/:name', function(req, res, next) {
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
server.get('/search/:name', search);
console.log("starting server");
server.listen(8080);