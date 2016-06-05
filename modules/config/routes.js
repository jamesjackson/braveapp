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
        res.redirect('/profile.html', next);
      }
  );

  server.get('/profile.html', isLoggedIn, function(req, res, next) {
    console.log(req.user);
  });

  server.get(/\/?.*/, restify.serveStatic({
      default: 'index.html',
      directory: './public'
  }));
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/facebook', next);
}
