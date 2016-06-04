var restify = require('restify');
var passport = require('passport');
var mongoose = require('mongoose');

require('./modules/config/passport')(passport);

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(passport.initialize());
server.use(passport.session());

require('./modules/config/routes.js')(server, restify, passport);


server.listen(process.env.PORT || 8080, function() {
    return console.log('%s listening at %s', server.name, server.url);
});
