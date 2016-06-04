
// load up the events model
var Event = require('../models/events');

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

  server.post('/redeem', function(req, res, next){
    
  });

  server.get('/profile', isLoggedIn, function(req, res, next) {
    console.log(req.user);
  });

  server.get('/user', isLoggedIn, function (req, res, next) {

        userinfo = req.user;
        console.log(userinfo);

        var userinfo_clean = {
            "user": userinfo.facebook.name,
            "points": userinfo.points,
            "photo": userinfo.photo
        }
        res.send(200, userinfo_clean);

    })

    server.post('/events', function (req, res, next) {

        // console.log(req.params);

        var newEvent = new Event();

        newEvent.name = req.params.name;
        newEvent.date = req.params.date;
        newEvent.description = req.params.description;
        newEvent.sponsors = req.params.sponsors;
        newEvent.address = req.params.address;
        newEvent.schedule = req.params.schedule;
        newEvent.map = req.params.map;
        newEvent.code = req.params.code;

        newEvent.save(function(err) {
            if (err)
                throw err;

            res.send(201);
        });

    })

    server.get('/logout', function(req, res, next){
        req.logout();
        res.redirect('/');
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login', next);
}