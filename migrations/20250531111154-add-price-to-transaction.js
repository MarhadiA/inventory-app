'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'priceAtTransaction', {
      type: Sequelize.INTEGER,
      allowNull: false, // Asumsi harga selalu ada saat transaksi
      defaultValue: 0   // Default value jika ada transaksi lama tanpa harga ini (tidak ideal, tapi untuk menghindari error)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'priceAtTransaction');
  }
};