// This file makes all join table relationships
var Sequelize = require('sequelize');
var sequelize = new Sequelize('glampr', 'happyglampr', 'glamprabmt', {
  dialect: 'mariadb',
  host: '127.0.0.1'
});

// Any vairable that starts with a capital letter is a model
var Trip = require('./trips.js')(sequelize, Sequelize);
var User = require('./users.js')(sequelize, Sequelize);
var Borrow = require('./borrow.js')(sequelize, Sequelize);
var Term = require('./terms.js')(sequelize, Sequelize);
var Required = require('./required.js')(sequelize, Sequelize);

var TripsUsers = require('./tripsUsers.js')(sequelize, Sequelize);
var BorrowUsers = require('./borrowUsers')(sequelize, Sequelize);
var RequiredUsers = require('./borrowUsers')(sequelize, Sequelize);

// TripsUsers join table:
User.belongsToMany(Trip, {
  through: 'trips_users',
  foreignKey: 'user_id'
});

Trip.belongsToMany(User, {
  through: 'trips_users',
  foreignKey: 'trip_id'
});

// Terms connections:
Trip.hasMany(Term, {
  foreignKey: 'trip_id'
});

Term.belongsTo(Trip, {
  foreignKey:'trip_id'
});

// BorrowUsers join table:
User.belongsToMany(Borrow, {
  through: 'borrow_users',
  foreignKey: 'user_id'
});

Borrow.belongsToMany(User, {
  through: 'borrow_users',
  foreignKey: 'borrow_id'
});

// Required to trips connection:
Required.belongsTo(Trip, {
  foreignKey: 'trip_id'
});

Trip.hasMany(Required, {
  foreignKey: 'trip_id'
});

// RequiredUsers join table connections:
Required.belongsToMany(User, {
  through: 'required_users',
  foreignKey: 'required_id'
});

User.belongsToMany(Required, {
  through: 'required_users',
  foreignKey: 'user_id'
});


sequelize.sync({force: true})

exports.Trip = Trip;
exports.User = User;
exports.Borrow = Borrow;
exports.Term = Term;
exports.Required = Required;

exports.TripsUsers = TripsUsers;
exports.BorrowUsers = BorrowUsers;
exports.RequiredUsers = RequiredUsers;








