
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

function makeid(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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

  server.post('/redeemPoints', isLoggedIn, function(req, res, next){
    req.user.points -= req.body.points;
    req.user.save();
    res.send(200, cleanUser(req.user));
  });

  server.post('/earnPoints', isLoggedIn, function(req, res, next){
    Event.findOne({'code' : req.body.code}, 'numPoints name', function(err, event){
       if (err){
        console.log(err);
        res.send(400, {});
       }
       if (event){
        var points = event._doc.numPoints;
        var name = event._doc.name;
        req.user.points += points;
        req.user.save();
        var userinfo_clean = cleanUser(req.user);
        userinfo_clean['pointsAdded'] = points;
        userinfo_clean['eventName'] = name;
        res.send(200, userinfo_clean);
      }else{
        res.send(432,{});
      }
    });

  });

  server.get('/user', isLoggedIn, function (req, res, next) {

        userinfo = req.user;
        console.log(userinfo);

        var userinfo_clean = cleanUser(userinfo);
        res.send(200, userinfo_clean);

    })

    server.post('/events', function (req, res, next) {

        var newEvent = new Event();

        newEvent.name = req.params.name;
        newEvent.date = req.params.date;
        newEvent.description = req.params.description;
        newEvent.sponsors = req.params.sponsors;
        newEvent.address = req.params.address;
        newEvent.schedule = req.params.schedule;
        newEvent.map = req.params.map;
        newEvent.code = makeid(6);

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