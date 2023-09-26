'use strict';
const { Model } = require('sequelize');
const { Column } = require('sequelize-typescript');
module.exports = (sequelize, DataTypes) => {
  class BoilerParts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BoilerParts.init(
    {
      name: DataTypes.STRING,
      boiler_manufacturer: DataTypes.STRING,
      price: DataTypes.NUMBER,
      parts_manufacturer: DataTypes.STRING,
      vendor_code: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      in_stock: DataTypes.NUMBER,
      bestseller: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      popularity: DataTypes.NUMBER,
      compatibility: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'BoilerParts',
    },
  );
  return BoilerParts;
};
