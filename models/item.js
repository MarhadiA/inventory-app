// models/item.js
'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, {
        foreignKey: 'CategoryId',
        as: 'Category',
        onDelete: 'SET NULL'
      });
      // Tambahkan asosiasi HasMany ke Transaction
      Item.hasMany(models.Transaction, {
        foreignKey: 'itemId',
        as: 'Transactions'
      });
    }
  }
  Item.init({
    name:  {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0},
    price: {  
      type: DataTypes.INTEGER,
      allowNull: false },
    entryDate: { 
      type: DataTypes.DATEONLY,
      allowNull: false },
    CategoryId: {   
      type: DataTypes.INTEGER,
      allowNull: true }
  }, {
    sequelize,
    modelName: 'Item',
    // --- TAMBAHKAN BAGIAN HOOKS INI ---
    hooks: {
      afterCreate: async (instance, options) => {
        // Ini adalah hook untuk Item. Tidak ada logika update stock di sini.
        // Logika update stock akan berada di hook Transaction.
      }
    }
    // --- AKHIR BAGIAN HOOKS INI ---
  });
  return Item;
};