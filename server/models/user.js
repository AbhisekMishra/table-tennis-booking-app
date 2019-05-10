'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    freezeTableName: true
  });
  User.associate = function({Booking}) {
    User.hasMany(Booking, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'bookings',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };
  return User;
};