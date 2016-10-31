var bcrypt = require('bcrypt-nodejs');
var User = require('../models/index.js').User;
var Trip = require('../models/index.js').Trip;

var comparePassword = function(user, attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, user.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

var create = function(props, callback) {
  User.build(props)
  .save()
  .then(function(user) {
    callback(user);
  }).catch(function(err) {
    console.log(err);
  });
};

var update = function(user, req, callback) {
  user.updateAttributes({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    phone_number: req.body.phone_number,
    tags: null
  })
  .then(function(user) {
    callback(user);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  User.findAll().then(function(users) {
    callback(users);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  User.findAll(query).done(function(users) {
    // if (err) {
    //   callback(err);
    // } else {
      callback(users[0]);
    // }
  });
};

var inviteMembers = function(users, trip, callback) {
  var inviteOne = function(userIndex) {
    if (userIndex === users.length) {
      callback();
      return;
    }
    User.find({where: {email: users[userIndex]}}).then(function(user) {
      if (!user) {
        //send invite to user via their email e.g: sendInvite(users[userIndex])
        User.create({email: users[userIndex]}).then(function(user) {
          user.addTrip(trip, {invite_status: 'invited', role: 'member'}).then(function() {
            inviteOne(userIndex + 1);
          });
        });
      } else {
        user.addTrip(trip, {invite_status: 'invited', role: 'member'}).then(function() {
          inviteOne(userIndex + 1);
        });
      }
    });
  };
  inviteOne(0);
};


exports.comparePassword = comparePassword;
exports.create = create;
exports.update = update;
exports.findAll = findAll;
exports.findOne = findOne;
exports.inviteMembers = inviteMembers;




