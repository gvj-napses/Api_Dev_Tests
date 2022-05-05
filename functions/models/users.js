'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Aadhar change ,  so need to add column
      this.belongsTo(models.aadharcarddetails,{foreignKey : 'aadharId'})
      this.hasMany(models.addresses,{foreignKey : 'userId'})
      this.belongsToMany(models.roles,{through : 'userroles', foreignKey : 'userId',otherKey : 'roleId'})

    }
    
  }
  users.init({
    id: {type : DataTypes.UUID, primaryKey : true},
    name: DataTypes.STRING,
    email: {type : DataTypes.STRING(50),validate : {isEmail : true}},
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};