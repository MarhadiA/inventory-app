// controllers/reportController.js
const { Op } = require('sequelize'); // Import Op untuk operasi tanggal
const { Item, Transaction } = require('../models'); // Impor model Item dan Transaction

class ReportController {
    // Fungsi untuk menampilkan formulir laporan awal
    static async showReportForm(req, res) {
        res.render('reports/report-form', {
            startDate: '',          // Nilai awal kosong untuk input tanggal
            endDate: '',            // Nilai awal kosong untuk input tanggal
            transactionType: '',    // Nilai awal kosong untuk dropdown jenis transaksi (artinya 'Semua')
            transactions: undefined, // Agar bagian hasil laporan belum muncul saat pertama kali load
            errors: undefined       // Untuk menampilkan pesan error validasi
        });
    }

    // Fungsi untuk menghasilkan dan menampilkan laporan berdasarkan kriteria
    static async generateReport(req, res) {
        const { startDate, endDate, transactionType } = req.query; // Ambil parameter dari query string (GET request)

        const errors = [];
        // Validasi input
        if (!startDate) errors.push('Tanggal Awal wajib diisi.');
        if (!endDate) errors.push('Tanggal Akhir wajib diisi.');

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            errors.push('Tanggal Awal tidak boleh lebih dari Tanggal Akhir.');
        }

        // Jika ada error validasi, render kembali form dengan pesan error
        if (errors.length > 0) {
            return res.render('reports/report-form', {
                errors,
                startDate,
                endDate,
                transactionType, // Kirim kembali nilai yang diinput pengguna
                transactions: undefined
            });
        }

        try {
            // Bangun kondisi WHERE untuk query database
            const whereClause = {
                transactionDate: {
                    [Op.between]: [startDate, endDate] // Filter berdasarkan rentang tanggal
                }
            };

            // Tambahkan filter jenis transaksi jika 'Masuk' atau 'Keluar' dipilih
            if (transactionType && (transactionType === 'Masuk' || transactionType === 'Keluar')) {
                whereClause.type = transactionType;
            }

            // Ambil transaksi dari database
            const transactions = await Transaction.findAll({
                where: whereClause, // Gunakan kondisi WHERE yang sudah difilter
                include: { model: Item, as: 'Item' }, // Sertakan data Item terkait untuk menampilkan nama barang
                order: [['transactionDate', 'ASC'], ['createdAt', 'ASC']] // Urutkan hasil
            });

            // Inisialisasi variabel untuk agregasi total
            let totalQuantityMasuk = 0;
            let totalQuantityKeluar = 0;
            let totalValueMasuk = 0;
            let totalValueKeluar = 0;

            // Lakukan perhitungan total kuantitas dan nilai dari transaksi yang ditemukan
            transactions.forEach(t => {
                const totalHargaTransaksi = t.quantity * (t.priceAtTransaction || 0); // Hitung total harga per transaksi
                if (t.type === 'Masuk') {
                    totalQuantityMasuk += t.quantity;
                    totalValueMasuk += totalHargaTransaksi;
                } else if (t.type === 'Keluar') {
                    totalQuantityKeluar += t.quantity;
                    totalValueKeluar += totalHargaTransaksi;
                }
            });

            // Render halaman laporan dengan data yang sudah difilter dan diagregasi
            res.render('reports/report-form', {
                startDate,
                endDate,
                transactionType,    // Kirim kembali jenis transaksi yang dipilih
                transactions,
                totalQuantityMasuk,   // Kirim total kuantitas masuk
                totalQuantityKeluar,  // Kirim total kuantitas keluar
                totalValueMasuk,      // Kirim total nilai masuk
                totalValueKeluar,     // Kirim total nilai keluar
                errors: undefined
            });

        } catch (error) {
            console.error('Error generating report:', error);
            // Render kembali form dengan pesan error jika ada kesalahan server
            res.render('reports/report-form', {
                errors: ['Terjadi kesalahan saat membuat laporan. Mohon coba lagi.'],
                startDate,
                endDate,
                transactionType,
                transactions: undefined
            });
        }
    }
}

module.exports = ReportController;