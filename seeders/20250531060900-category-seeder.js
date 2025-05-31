'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Elektronik',
        description: 'Berbagai perangkat elektronik rumah tangga dan pribadi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peralatan Kantor',
        description: 'Alat tulis, printer, dan perlengkapan kantor lainnya',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Buku',
        description: 'Koleksi buku dari berbagai genre dan penulis',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    console.log('Category seeder successfully run!'); // Tambahkan log ini
    // return queryInterface.bulkInsert('Categories', [...], {}); // Jika pakai promise, return ini
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
    console.log('Category seeder successfully reverted!'); // Tambahkan log ini
  }
};