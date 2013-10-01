var restify = require('restify');

var server = restify.createServer({
  name: 'beermenu',
});

function search(req, res, next) {
   res.send('search brewery for ' + req.params.name);
   return next();
 }

server.get('/search/:name', search);

server.listen(8080);