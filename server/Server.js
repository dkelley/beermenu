var restify = require('restify');
var mongoose = require('mongoose');

mongoose.connect('mongodb://dan:r1ppl3@paulo.mongohq.com:10019/beermenu');

var schemas = require('./models/index');
var server = restify.createServer({
  name: 'beermenu',
});

function search(req, res, next) {
   res.send('search brewery for ' + req.params.name);
   return next();
 }

server.get('/save/:name', function(req, res, next) {
	console.log("saving %s", req.params.name);
	
	var bar = new schemas.Bar({name: req.params.name});
	bar.save(function(error, bar){
		if (!error)
		   return res.send(bar);
		else
			console.log(error);
	});

   return next();
 });	



// setup our server
server.get('/search/:name', search);
console.log("schemas", schemas);
console.log("starting server");
server.listen(8080);