module.exports = function(server, restify, passport) {

  server.get('/auth/facebook',
    passport.authenticate('facebook')
  );

  //facebook auth path
  server.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          session : true,
          failureRedirect : '/login'
      }),
      function(req, res){
          res.redirect('/welcome')
      },
      function(err,req,res,next) {
          // You could put your own behavior in here, fx: you could force auth again...
          // res.redirect('/auth/facebook/');
          if(err) {
              res.redirect('/auth/facebook/')
          }
      }
  );

  server.get(/\/?.*/, restify.serveStatic({
      default: 'index.html',
      directory: './public'
  }));
}
