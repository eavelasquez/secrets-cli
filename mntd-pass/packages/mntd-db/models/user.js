'use strict'
const { hashPassword, generateRandomKey } = require('@mntd/crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    randomKey: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await hashPassword(user.password),
        user.randomkey = await generateRandomKey(),
      }
    },
  })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Secret, {
      sourceKey: 'username',
      foreignKey: 'username',
      as: 'secrets',
    })
  }
  return User
}