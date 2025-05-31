// controllers/transactionController.js
const { Item, Transaction } = require('../models'); // Impor model

class TransactionController {

    static async listTransactions(req, res) {
        try {
            const transactions = await Transaction.findAll({
                include: { model: Item, as: 'Item' }, // Sertakan data barang
                order: [['transactionDate', 'DESC']] // Urutkan berdasarkan tanggal terbaru
            });
            res.render('transactions/list', { transactions });
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.send('Terjadi kesalahan saat mengambil data transaksi.');
        }
    }

    static async addTransactionForm(req, res) {
        try {
            const items = await Item.findAll({ order: [['name', 'ASC']] });
            res.render('transactions/add-form', { items });
        } catch (error) {
            console.error('Error rendering add transaction form:', error);
            res.send('Terjadi kesalahan saat memuat form tambah transaksi.');
        }
    }

    static async createTransaction(req, res) {
        try {
            const { itemId, type, quantity, transactionDate } = req.body;

            const errors = [];
            if (!itemId) errors.push('Barang wajib dipilih.');
            if (!type) errors.push('Jenis transaksi wajib dipilih.');
            if (!quantity || quantity < 1) errors.push('Jumlah harus lebih dari 0.');
            if (!transactionDate) errors.push('Tanggal transaksi wajib diisi.');

            if (errors.length > 0) {
                const items = await Item.findAll({ order: [['name', 'ASC']] });
                return res.render('transactions/add-form', { errors, items, transaction: req.body });
            }

            // Sequelize hooks (afterCreate di model Transaction) akan otomatis update stok
            await Transaction.create({ itemId, type, quantity, transactionDate });
            res.redirect('/transactions');
        } catch (error) {
            // Tangani error dari hook (misal: stok kurang)
            if (error.message.includes('Jumlah barang keluar melebihi stok yang tersedia.')) {
                const items = await Item.findAll({ order: [['name', 'ASC']] });
                return res.render('transactions/add-form', {
                    errors: [error.message],
                    items,
                    transaction: req.body
                });
            }
            console.error('Error creating transaction:', error);
            res.send('Terjadi kesalahan saat mencatat transaksi.');
        }
    }
    static async showTransactionDetail(req, res) {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findByPk(id, {
                include: { model: Item, as: 'Item' } // Pastikan menyertakan data item
            });

            if (!transaction) {
                return res.status(404).send('Transaksi tidak ditemukan.');
            }

            res.render('transactions/detail', { transaction });
        } catch (error) {
            console.error('Error fetching transaction detail:', error);
            res.send('Terjadi kesalahan saat memuat detail transaksi.');
        }
    }

    // Untuk transaksi, biasanya tidak ada fungsi edit atau hapus langsung karena mengubah riwayat.
    // Jika memang perlu, harus diimplementasikan dengan sangat hati-hati untuk mengembalikan stok.
}

module.exports = TransactionController;