'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 // Tambahkan defaultValue ini jika belum ada
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      entryDate: {
        type: Sequelize.DATEONLY, // Disarankan pakai DATEONLY untuk tanggal saja
        allowNull: false
      },
      // --- MULAI PENAMBAHAN BAGIAN CATEGORYID ---
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Item bisa tidak punya kategori jika kategori dihapus
        references: {
          model: 'Categories', // Nama tabel Kategori Anda (biasanya plural)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Jika kategori dihapus, CategoryId di Item akan diatur ke NULL
      },
      // --- AKHIR PENAMBAHAN BAGIAN CATEGORYID ---
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
    await queryInterface.dropTable('Items');
  }
};