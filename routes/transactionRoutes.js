// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController'); // Impor controller

router.get('/', TransactionController.listTransactions); // Daftar semua transaksi
router.get('/add', TransactionController.addTransactionForm); // Form tambah transaksi
router.post('/add', TransactionController.createTransaction); // Proses tambah transaksi
router.get('/detail/:id', TransactionController.showTransactionDetail);

module.exports = router;