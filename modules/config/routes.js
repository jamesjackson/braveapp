
// load up the events model
var Event = require('../models/events');

function cleanUser(userinfo){
  var userinfo_clean = {
      "user": userinfo.facebook.name,
      "points": userinfo.points,
      "photo": userinfo.photo
  }
  return userinfo_clean
}

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

  server.post('/earnPoints', isLoggedIn, function(req, res, next){
    Event.findOne({'code' : req.body.code}, 'numPoints', function(err, event){
       if (err) return handleError(err);
       points = event._doc.numPoints;
       req.user.points += points;
       req.user.save();
       var userinfo_clean = cleanUser(req.user);
       userinfo_clean['pointsAdded'] = points;
       res.send(200, userinfo_clean);
    });

  });

  server.get('/user', isLoggedIn, function (req, res, next) {

        userinfo = req.user;
        console.log(userinfo);

        var userinfo_clean = cleanUser(userinfo);
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

    server.get('/events', function (req, res, next) {

        Event.find({}, function(err, events) {
            if (err) throw err;

            var key = "code";

            events.forEach (function (e){
                delete e._doc[key];
                // console.log(e._doc);
            });

            res.send(200, events);
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