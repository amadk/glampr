var express = require('express');
var userController = require('../../db/controllers/users.js');
var tripController = require('../../db/controllers/trips.js');

var router = express.Router();

router.route('/')
  .post(function(req, res) {
      tripController.insertOne(req.body.tripData, function(trip) {
        req.session.tripId = trip.get('id');
        console.log('Added trip');
        userController.findOne({where: {email: req.session.email}}, function(user) {
          console.log('found user ');

          user.addTrip(trip, {invite_status: 'invited', role: 'organizer'}).then(function() {
            userController.inviteMembers(user.get('name'), req.body.invitees, trip, function() {
              res.send('Added trip and invited all members');
            })
          });
        })
      });
    });

module.exports = router;