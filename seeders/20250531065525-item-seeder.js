'use strict';
const { Category } = require('../models'); // Impor model Category

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Dapatkan ID kategori yang sudah ada dari database
    const elektronikCategory = await Category.findOne({ where: { name: 'Elektronik' } });
    const peralatanKantorCategory = await Category.findOne({ where: { name: 'Peralatan Kantor' } });
    const bukuCategory = await Category.findOne({ where: { name: 'Buku' } });

    await queryInterface.bulkInsert('Items', [
      {
        name: 'Laptop ASUS ROG',
        description: 'Laptop gaming berperforma tinggi',
        quantity: 5,
        price: 18000000,
        entryDate: new Date(),
        CategoryId: elektronikCategory.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Monitor Dell 27"',
        description: 'Monitor IPS 4K untuk produktivitas',
        quantity: 10,
        price: 4500000,
        entryDate: new Date(),
        CategoryId: elektronikCategory.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Set Pulpen Gel',
        description: 'Pulpen tinta gel warna-warni',
        quantity: 50,
        price: 35000,
        entryDate: new Date(),
        CategoryId: peralatanKantorCategory.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kertas HVS A4',
        description: 'Kertas putih untuk printer dan fotokopi',
        quantity: 200,
        price: 40000,
        entryDate: new Date(),
        CategoryId: peralatanKantorCategory.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Buku Fiksi Fantasi',
        description: 'Novel epik tentang dunia sihir',
        quantity: 15,
        price: 120000,
        entryDate: new Date(),
        CategoryId: bukuCategory.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};