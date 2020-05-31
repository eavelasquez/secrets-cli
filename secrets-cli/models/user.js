'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'users'
  })
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
