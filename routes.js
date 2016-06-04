module.exports = function(server, restify, passport) {

	server.get(/\/?.*/, restify.serveStatic({
	    default: 'index.html',
	    directory: './public'
	}));
}