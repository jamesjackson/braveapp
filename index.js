var restify = require('restify');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fs = require('fs');
require('./modules/config/passport')(passport);

var dbURL = process.env.MONGOHQ_URL;

var server = restify.createServer();
<<<<<<< cd61d8ac3463825756d246235d1f4d1dc31ca11b
=======

server.use(restify.queryParser());
server.use(restify.bodyParser());
mongoose.connect(dbURL); // connect to our database
mongoose.connection.on('error', function (err) {
 console.log(err);
});
>>>>>>> Merge conflict useless message

server.use(restify.queryParser());
server.use(restify.bodyParser());
mongoose.connect(dbURL); // connect to our database
mongoose.connection.on('error', function (err) {
 console.log(err);
});


server.use(restify.CORS());

server.use(session({
    key : 'SessionKey',
    secret : 'CATONTHEKEYBOARD',
    cookie : {
        path : '/',
        httpOnly : true,
        maxAge : null
    },
    resave: true,
    saveUninitialized: true,
    store : new MongoStore({
        url : dbURL,
        collection : 'sessions',
        stringify : false
    }).on('connected', function(result) {
        console.log('Connected to sessions db!');
        return;

    })
}));

server.use(passport.initialize());
server.use(passport.session());

require('./modules/config/routes.js')(server, restify, passport);

server.listen(process.env.PORT || 8080, function() {
    return console.log('%s listening at %s', server.name, server.url);
});
