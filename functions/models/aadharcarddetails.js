'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aadharcarddetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.users,{foreignKey : 'aadharId'})

    }
  }
  aadharcarddetails.init({
    id: {type : DataTypes.UUID,primaryKey : true},
    name: DataTypes.STRING,
    aadharnumber: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'aadharcarddetails',
  });
  return aadharcarddetails;
};