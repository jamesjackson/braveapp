var restify = require('restify');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.use(restify.CORS());

server.get(/\/?.*/, restify.serveStatic({
    default: 'index.html',
    directory: './public'
}));

server.listen(process.env.PORT || 8080, function() {
    return console.log('%s listening at %s', server.name, server.url);
});