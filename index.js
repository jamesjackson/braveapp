var restify = require('restify');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
require('./modules/config/passport')(passport);

var mongoCreds = {
	user : 'braveapp',
	password : '123456',
	uri : 'aws-us-east-1-portal.11.dblayer.com',
	port : '28113',
	database : 'brave-mongo'
}
var dbURL = "mongodb://"+mongoCreds.user+":"+mongoCreds.password+"@"+mongoCreds.uri+":"+mongoCreds.port+"/"+mongoCreds.database+"?ssl=true";

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var ca =[fs.readFileSync('private/cert.pem')];
var options = {
	mongos: {
		ssl: true,
		sslValidate: true,
		sslCA: ca // cert from compose.io dashboard
	}
}

mongoose.connect(dbURL, options); // connect to our database

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(passport.initialize());
server.use(passport.session());

var ca =[fs.readFileSync('private/cert.pem')];
var options = {
	mongos: {
		ssl: true,
		sslValidate: true,
		sslCA: ca // cert from compose.io dashboard
	}
}

mongoose.connect(dbURL, options); // connect to our database

require('./modules/config/routes.js')(server, restify, passport);

server.listen(process.env.PORT || 8080, function() {
    return console.log('%s listening at %s', server.name, server.url);
});
