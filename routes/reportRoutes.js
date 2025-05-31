// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController'); // Impor controller laporan

// GET /reports - Menampilkan formulir laporan dan/atau hasil laporan
// Karena form menggunakan method GET dan action="/reports",
// route ini akan menangani permintaan awal (tanpa query params)
// dan juga permintaan setelah form disubmit (dengan query params: startDate, endDate, transactionType)
router.get('/', ReportController.generateReport); // Gunakan generateReport untuk kedua kasus.
                                                 // Fungsi ini dirancang untuk menangani tanpa data awal (kosong)
                                                 // dan dengan data (setelah form disubmit).

// Jika Anda ingin route terpisah untuk menampilkan form kosong saja, Anda bisa memiliki:
// router.get('/form', ReportController.showReportForm);
// dan router.get('/', ReportController.generateReport);
// Tapi untuk kesederhanaan, satu route GET sudah cukup.
module.exports = router;