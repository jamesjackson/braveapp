var restify = require('restify');
var passport = require('passport-restify');
var mongoose = require('mongoose');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.use(restify.CORS());

require('./modules/config/routes.js')(server, restify, null);
require('./modules/config/passport')(passport);

server.listen(process.env.PORT || 8080, function() {
    return console.log('%s listening at %s', server.name, server.url);
});
