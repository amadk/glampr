var Sequelize = require('sequelize');
var sequelize = new Sequelize('glampr', 'happyglampr', 'glamprabmt', {
  dialect: 'mariadb',
  host: '127.0.0.1'
});

var UserModel = require('./users.js');


var TripModel = sequelize.define('trip', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  start_date: {
    type: Sequelize.DATE
  },
  end_date: {
    type: Sequelize.DATE,
  },
  address: {
    type: Sequelize.STRING
  },
  google_maps_url: {
    type: Sequelize.TEXT,
  },
  cost_per_member: {
    type: Sequelize.INTEGER,
  },
  cost_deadline: {
    type: Sequelize.DATE,
  },
  tags: {
    type: Sequelize.STRING
  }
});

module.exports = TripModel;