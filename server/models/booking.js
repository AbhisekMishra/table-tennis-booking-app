'use strict';
module.exports = (sequelize, DataTypes) => {
  var Booking = sequelize.define('Booking', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, {
    freezeTableName: true
  });
  Booking.associate = function() {
    // associations can be defined here
  };
  return Booking;
};