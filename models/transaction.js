// models/transaction.js
'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'Item'
      });
    }
  }
  Transaction.init({
    itemId: {    
      type: DataTypes.INTEGER,
      allowNull: false },
    type: {    
      type: DataTypes.ENUM('Masuk', 'Keluar'),
      allowNull: false },
    quantity: {    
      type: DataTypes.INTEGER,
      allowNull: false },
    transactionDate: { 
      type: DataTypes.DATEONLY, 
      allowNull: false
     },
    priceAtTransaction: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0         
   }
},
   {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      afterCreate: async (transaction, options) => {
        const Item = sequelize.models.Item; // Dapatkan model Item
        const item = await Item.findByPk(transaction.itemId);
        
        if (item) {
          console.log('Item found:', item.name, 'Price:', item.price);
          // Jika ini transaksi baru, set priceAtTransaction dari item saat ini
          // Ini penting karena harga bisa berubah dari waktu ke waktu
          // Perhatian: Ini akan mengupdate kembali objek transaction setelah dibuat
          // sehingga priceAtTransaction yang baru diambil dari item akan disimpan
          // ke database untuk transaksi yang baru saja dibuat.
          transaction.priceAtTransaction = item.price;
          console.log('Transaction priceAtTransaction after set:', transaction.priceAtTransaction); // Set nilai priceAtTransaction di objek transaksi
          await transaction.save({ fields: ['priceAtTransaction'] }); // Simpan perubahan di transaksi itu sendiri

          if (transaction.type === 'Masuk') {
            item.quantity += transaction.quantity;
          } else if (transaction.type === 'Keluar') {
            if (item.quantity < transaction.quantity) {
                throw new Error('Jumlah barang keluar melebihi stok yang tersedia.');
            }
            item.quantity -= transaction.quantity;
          }
          await item.save();
        }else {
            console.warn(`Item with ID ${transaction.itemId} not found for transaction ${transaction.id}`);
            // Anda bisa memutuskan untuk throw error di sini jika item tidak ditemukan
        }
      },
    }
    // --- AKHIR BAGIAN HOOKS INI ---
  });
  return Transaction;
};