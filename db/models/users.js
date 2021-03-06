module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
    password: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    profile_pic: {
      type: Sequelize.TEXT
    },
    tags: {
      type: Sequelize.STRING
    }
  });

  return User;
}