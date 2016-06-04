module.exports = function(server, restify, passport) {

  server.get('/auth/facebook',
    passport.authenticate('facebook', {scope: 'email'})
  );

  //facebook auth path
  server.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          session : true
      }),
      function(req, res, next){
        res.redirect('/welcome.html', next);
      }
  );

  server.get(/\/?.*/, restify.serveStatic({
      default: 'index.html',
      directory: './public'
  }));
}
