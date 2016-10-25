var UserModel = require('../models/users.js');
var TripModel = require('../models/trips.js');


UserModel.belongsToMany(TripModel, {
  through: 'trips_users',
  foreignKey: 'user_id',
  otherKey: 'trip_id'
});


TripModel.belongsToMany(UserModel, {
  through: 'trips_users',
  foreignKey: 'trip_id',
  otherKey: 'user_id'
});


var findAll = function(callback) {
  UserModel.findAll().then(function(users) {
    console.log('findAll in controllers file: ', users)
    callback(users)
  }).catch(function(err) {
    console.log(err);
  })
}

var findOne = function(query, callback) {
  UserModel.find({where: query}).then(function(err, user) {
    if(err) {
      callback(err)
    } else {
      callback(user)        
    }
  });
}

var insertOne = function(user, callback) {
  UserModel.create(user).then(function(user) {
    callback(user);
  });
}

exports.findAll = findAll;
exports.findOne = findOne;
exports.insertOne = insertOne;