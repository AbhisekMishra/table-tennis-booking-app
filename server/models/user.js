'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};