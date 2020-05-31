'use strict';
module.exports = (sequelize, DataTypes) => {
  const Secret = sequelize.define('Secret', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'secrets'
  });
  Secret.associate = function(models) {
    // associations can be defined here
  };
  return Secret;
};
