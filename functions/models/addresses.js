'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users,{foreignKey : 'userId'})
    }
  }
  addresses.init({
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};