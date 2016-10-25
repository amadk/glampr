var Sequelize = require('sequelize');
var sequelize = new Sequelize('glampr', 'happyglampr', 'glamprabmt', {
  dialect: 'mariadb',
  host: '127.0.0.1'
});
var TripModel = require('./trips.js');

var UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  phone_number: {
    type: Sequelize.STRING
  },
  invite_status: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});



module.exports = UserModel;
