// migrations/<timestamp>-create-transaction.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: { // Ini akan menjadi foreign key ke tabel Items
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Items', // Nama tabel yang direferensikan (plural)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Jika item dihapus, transaksi terkait juga dihapus
      },
      type: { // 'Masuk' atau 'Keluar'
        type: Sequelize.ENUM('Masuk', 'Keluar'),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      transactionDate: {
        type: Sequelize.DATEONLY, // Hanya tanggal
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};