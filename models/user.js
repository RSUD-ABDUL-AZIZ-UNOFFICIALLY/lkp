'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Departemen, {
        foreignKey: 'dep',
        as: 'departemen'
      })
      User.hasOne(models.Atasan, {
        foreignKey: 'user',
        as: 'atasan'
      })
      User.hasOne(models.Profile, {
        sourceKey: 'nik',
        foreignKey: 'nik',
        as: 'profile'
      })
      User.hasOne(models.Biodatas, {
        sourceKey: 'nik',
        foreignKey: 'nik',
        as: 'biodata'
      })
    }
  }
  User.init({
    nik: DataTypes.INTEGER,
    nip: DataTypes.INTEGER,
    JnsKel: DataTypes.ENUM('Laki-laki', 'Perempuan'),
    tgl_lahir: DataTypes.DATEONLY,
    nama: DataTypes.STRING,
    dep: DataTypes.INTEGER,
    jab: DataTypes.STRING(300),
    wa: DataTypes.STRING,
    status: DataTypes.ENUM('PNS', 'PPPK', 'Non ASN'),
    email: DataTypes.STRING(300)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};