// controllers/dashboardController.js
const { Op } = require('sequelize'); // Diperlukan untuk operasi tanggal (misal: Op.gte)
const { Item, Transaction, Category } = require('../models'); // Impor semua model yang dibutuhkan

class DashboardController {
    static async showDashboard(req, res) {
        try {
            // Ambil total item dan kategori (untuk ringkasan dashboard)
            const totalItems = await Item.count();
            const totalCategories = await Category.count();

            // --- Logika Pengambilan Data untuk Grafik ---
            const today = new Date();
            const sixMonthsAgo = new Date();
            // Atur tanggal menjadi 6 bulan yang lalu dari bulan ini, mulai dari tanggal 1
            sixMonthsAgo.setMonth(today.getMonth() - 5); // Ambil 6 bulan terakhir (termasuk bulan ini)
            sixMonthsAgo.setDate(1); // Set ke tanggal 1 untuk memastikan awal bulan

            // Ambil semua transaksi dari 6 bulan terakhir
            const transactions = await Transaction.findAll({
                where: {
                    transactionDate: {
                        [Op.gte]: sixMonthsAgo.toISOString().split('T')[0] // Filter tanggal awal
                    }
                },
                order: [['transactionDate', 'ASC']] // Urutkan berdasarkan tanggal
            });

            // Agregasi data per bulan
            // Contoh: { '2024-01': { totalMasuk: 100000, totalKeluar: 50000 }, '2024-02': {...} }
            const monthlyData = {};

            transactions.forEach(t => {
                // Ekstrak tahun dan bulan (YYYY-MM) dari tanggal transaksi
                const monthYear = new Date(t.transactionDate).toISOString().substring(0, 7);
                
                // Inisialisasi jika bulan belum ada di monthlyData
                if (!monthlyData[monthYear]) {
                    monthlyData[monthYear] = { totalMasuk: 0, totalKeluar: 0 };
                }

                // Hitung nilai transaksi (quantity * priceAtTransaction)
                const transactionValue = t.quantity * (t.priceAtTransaction || 0);

                // Tambahkan ke total masuk atau keluar sesuai jenis transaksi
                if (t.type === 'Masuk') {
                    monthlyData[monthYear].totalMasuk += transactionValue;
                } else if (t.type === 'Keluar') {
                    monthlyData[monthYear].totalKeluar += transactionValue;
                }
            });

            // Format data untuk Chart.js (membutuhkan array terpisah untuk labels, dataMasuk, dataKeluar)
            const labels = Object.keys(monthlyData).sort(); // Ambil semua bulan dan urutkan
            const dataMasuk = labels.map(month => monthlyData[month].totalMasuk);
            const dataKeluar = labels.map(month => monthlyData[month].totalKeluar);

            // Format label bulan agar lebih mudah dibaca (misal: "Jan 2024")
            const formattedLabels = labels.map(label => {
                const [year, month] = label.split('-');
                // Buat objek Date untuk memformat nama bulan
                const date = new Date(year, parseInt(month) - 1); 
                return date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
            });
               console.log('--- Data yang dikirim ke Dashboard EJS ---');
        console.log('chartLabels:', formattedLabels);
        console.log('chartDataMasuk:', dataMasuk);
        console.log('chartDataKeluar:', dataKeluar);
        console.log('Total Items:', totalItems);
        console.log('Total Categories:', totalCategories);
        console.log('------------------------------------------');

            // Render tampilan dashboard dengan data yang sudah disiapkan
            res.render('dashboard', {
                totalItems,
                totalCategories,
                chartLabels: formattedLabels, // Label untuk sumbu X grafik (bulan)
                chartDataMasuk: dataMasuk,     // Data nilai total masuk
                chartDataKeluar: dataKeluar    // Data nilai total keluar
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.send('Terjadi kesalahan saat memuat dashboard.');
        }
    }
}

module.exports = DashboardController;