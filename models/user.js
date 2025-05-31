// models/user.js
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // Impor bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    // Metode untuk membandingkan password yang dimasukkan dengan password hash di database
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Username tidak boleh kosong' },
        notEmpty: { msg: 'Username tidak boleh kosong' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password tidak boleh kosong' },
        notEmpty: { msg: 'Password tidak boleh kosong' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // Hook untuk hashing password sebelum user dibuat
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); // Generasi salt
        user.password = await bcrypt.hash(user.password, salt); // Hash password
      }
    }
  });
  return User;
};