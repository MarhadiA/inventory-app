Aplikasi Inventaris Sederhana adalah sistem manajemen inventaris berbasis web yang dirancang untuk membantu Anda mengelola barang, kategori, dan transaksi (masuk/keluar) secara efisien. Dengan fitur autentikasi pengguna dan dashboard interaktif, aplikasi ini memberikan solusi dasar namun kuat untuk pencatatan dan pelacakan inventaris.

Daftar Isi
Fitur Utama
Teknologi yang Digunakan
Persyaratan Sistem
Instalasi dan Penggunaan
Instalasi
Konfigurasi Database
Menjalankan Aplikasi
Menggunakan Aplikasi
Struktur Proyek
Kontribusi
Lisensi
Fitur Utama
Aplikasi Inventaris Sederhana dilengkapi dengan berbagai fitur inti untuk membantu manajemen inventaris:

Manajemen Barang:
Tambah Barang Baru: Masukkan detail barang seperti nama, deskripsi, kuantitas, harga beli, dan tanggal masuk.
Lihat Detail Barang: Tampilkan semua informasi tentang setiap barang.
Edit Barang: Perbarui informasi barang yang sudah ada.
Hapus Barang: Hapus item dari inventaris.
Manajemen Kategori:
Buat Kategori: Tambah kategori baru untuk mengelompokkan barang.
Lihat Daftar Kategori: Tampilkan semua kategori yang tersedia.
Edit dan Hapus Kategori: Kelola kategori sesuai kebutuhan.
Manajemen Transaksi:
Pencatatan Transaksi Masuk: Catat ketika barang masuk ke gudang, dengan perhitungan otomatis total nilai.
Pencatatan Transaksi Keluar: Catat ketika barang keluar dari gudang, juga dengan perhitungan total nilai.
Riwayat Transaksi: Lihat daftar lengkap semua transaksi yang pernah terjadi.
Dashboard Interaktif:
Menampilkan ringkasan total barang dan total kategori.
Visualisasi grafik tren nilai transaksi (masuk dan keluar) selama 6 bulan terakhir menggunakan Chart.js untuk analisis cepat.
Autentikasi Pengguna:
Sistem Login dan Register untuk melindungi akses ke aplikasi.
Password pengguna di-hash menggunakan bcryptjs untuk keamanan.
Manajemen sesi pengguna menggunakan express-session dan Passport.js.
Laporan:
Halaman khusus untuk melihat ringkasan transaksi berdasarkan rentang tanggal yang dipilih.
Teknologi yang Digunakan
Aplikasi ini dibangun menggunakan tumpukan teknologi (stack) populer dan modern yang kokoh dan efisien:

Backend:
Node.js: Lingkungan runtime JavaScript yang powerful untuk membangun aplikasi server-side.
Express.js: Framework web minimalis dan fleksibel untuk Node.js, memudahkan pembuatan API dan routing.
Sequelize: ORM (Object-Relational Mapper) berbasis Promise yang kuat untuk Node.js, memungkinkan interaksi mudah dengan database relasional menggunakan JavaScript.
Database:
MySQL / PostgreSQL / SQLite: Aplikasi ini fleksibel dan dapat dikonfigurasi untuk bekerja dengan salah satu sistem manajemen database relasional ini. Konfigurasi dilakukan di config/config.json.
Autentikasi & Otorisasi:
Passport.js: Middleware autentikasi yang fleksibel untuk Node.js, mendukung berbagai strategi autentikasi.
passport-local: Strategi Passport.js untuk autentikasi username dan password lokal.
bcryptjs: Library untuk melakukan hashing password yang aman dan cepat, mencegah penyimpanan password dalam bentuk plain text.
express-session: Middleware untuk mengelola sesi pengguna, memungkinkan pengguna tetap login setelah otentikasi.
connect-flash: Middleware untuk menampilkan pesan flash (pesan sementara yang hilang setelah satu kali tampilan, seperti pesan error login).
Frontend:
EJS (Embedded JavaScript): Templating engine yang memungkinkan Anda menulis kode JavaScript langsung di dalam markup HTML untuk membuat tampilan web yang dinamis.
Chart.js: Library JavaScript sumber terbuka yang elegan untuk visualisasi data, digunakan untuk membuat grafik interaktif di dashboard.
HTML5, CSS3, JavaScript: Dasar-dasar pengembangan web untuk struktur, gaya, dan interaktivitas sisi klien.
Persyaratan Sistem
Sebelum Anda dapat menginstal dan menjalankan aplikasi ini, pastikan sistem Anda memenuhi persyaratan berikut:

Node.js:
Versi 14.x atau lebih tinggi. Anda bisa mengunduhnya dari situs resmi Node.js.
npm (Node Package Manager):
Biasanya sudah terinstal secara otomatis bersama Node.js.
Sistem Database:
MySQL: Jika Anda memilih MySQL, pastikan MySQL Server terinstal dan berjalan di sistem Anda. Anda bisa mengunduhnya dari [tautan mencurigakan telah dihapus].
PostgreSQL: Jika Anda memilih PostgreSQL, pastikan PostgreSQL Server terinstal dan berjalan. Unduh dari situs resmi PostgreSQL.
SQLite: Jika Anda memilih SQLite, tidak ada instalasi server terpisah yang diperlukan. File database akan dibuat secara otomatis di direktori proyek Anda. Namun, Anda perlu menginstal driver sqlite3 Node.js dengan npm install sqlite3.
Instalasi dan Penggunaan
Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi ini di lingkungan lokal Anda.

Instalasi
Klon Repositori:
Buka terminal atau Git Bash, lalu navigasikan ke direktori tempat Anda ingin menyimpan proyek. Kemudian, klon repositori ini:

Bash

git clone <URL_REPOSITORI_ANDA>
cd Inventory-app
Ganti <URL_REPOSITORI_ANDA> dengan URL repositori GitHub Anda.

Instal Dependensi:
Setelah masuk ke direktori proyek (Inventory-app/), instal semua paket Node.js yang dibutuhkan:

Bash

npm install
Konfigurasi Database
Aplikasi ini menggunakan Sequelize untuk interaksi database. Anda perlu mengkonfigurasi koneksi database Anda di file config/config.json.

Buka file config/config.json di editor teks Anda.

Ubah bagian development agar sesuai dengan konfigurasi database lokal Anda (username, password, database name, host, dan dialect).

Contoh Konfigurasi untuk MySQL:

JSON

{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "inventory_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "inventory_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
Pastikan database inventory_db sudah Anda buat di MySQL.

Contoh Konfigurasi untuk PostgreSQL:

JSON

{
  "development": {
    "username": "postgres",
    "password": "your_pg_password",
    "database": "inventory_db",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "your_pg_password",
    "database": "inventory_db",
    "host": "localhost",
    "dialect": "postgres"
  }
}
Pastikan database inventory_db sudah Anda buat di PostgreSQL.

Contoh Konfigurasi untuk SQLite (Paling Mudah):

JSON

{
  "development": {
    "dialect": "sqlite",
    "storage": "./inventory_db.sqlite"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./inventory_db.sqlite"
  }
}
Jika menggunakan SQLite, pastikan Anda telah menginstal driver sqlite3 dengan npm install sqlite3.

Jalankan Migrasi Database:
Setelah konfigurasi database selesai, jalankan migrasi Sequelize untuk membuat semua tabel database yang diperlukan (Users, Items, Categories, Transactions):

Bash

npx sequelize-cli db:migrate
Menjalankan Aplikasi
Setelah semua dependensi terinstal dan database terkonfigurasi, Anda bisa memulai server Node.js:

Bash

npm start
Atau, jika Anda sudah menginstal Nodemon (disarankan untuk pengembangan karena otomatis me-restart server saat ada perubahan kode):

Bash

nodemon app.js
Aplikasi akan berjalan di http://localhost:3000 (atau port lain yang Anda atur di app.js).

Menggunakan Aplikasi
Setelah aplikasi berjalan, buka browser web Anda dan navigasikan ke http://localhost:3000.

Daftar Akun Baru (Register):

Saat pertama kali mengakses aplikasi, Anda akan otomatis diarahkan ke halaman Login.
Klik tautan "Belum punya akun? Daftar di sini" atau navigasi langsung ke http://localhost:3000/auth/register.
Isi username dan password yang Anda inginkan untuk membuat akun pengguna baru.
Setelah berhasil mendaftar, Anda akan diarahkan kembali ke halaman Login.
Login:

Pada halaman Login, masukkan username dan password yang baru saja Anda buat.
Klik tombol Login.
Dashboard:

Setelah berhasil login, Anda akan melihat Dashboard Aplikasi Inventaris. Di sini Anda bisa melihat ringkasan inventaris dan grafik tren transaksi.
Navigasi:

Gunakan bilah navigasi di bagian atas halaman untuk berpindah antar modul:
Dashboard: Ringkasan dan grafik.
Barang: Mengelola data item inventaris.
Kategori: Mengelola kategori barang.
Transaksi: Mencatat dan melihat transaksi masuk/keluar.
Laporan: Melihat laporan transaksi berdasarkan periode.
Logout:

Untuk keluar dari sesi Anda, klik tombol "Logout" di bilah navigasi (biasanya di sisi kanan atas).
Struktur Proyek
Berikut adalah gambaran umum struktur direktori proyek ini:

Inventory-app/
├── config/                  # Konfigurasi aplikasi (database, passport)
│   ├── config.json          # Konfigurasi koneksi database Sequelize
│   └── passport.js          # Konfigurasi strategi autentikasi Passport.js
├── controllers/             # Logika bisnis untuk setiap route (handle permintaan)
│   ├── categoryController.js
│   ├── dashboardController.js
│   ├── itemController.js
│   ├── reportController.js
│   └── transactionController.js
├── migrations/              # Skrip migrasi database Sequelize (membuat/mengubah tabel)
├── models/                  # Definisi model Sequelize (Item, Category, Transaction, User)
├── public/                  # File statis yang diakses langsung oleh browser (CSS, gambar, JavaScript frontend)
│   ├── css/
│   │   └── style.css
│   └── images/              # (Direktori untuk screenshot atau gambar lain)
├── routes/                  # Definisi route API (menghubungkan URL dengan controller)
│   ├── authRoutes.js        # Route khusus untuk autentikasi (register, login, logout)
│   ├── categoryRoutes.js
│   ├── dashboardRoutes.js
│   ├── itemRoutes.js
│   ├── reportRoutes.js
│   └── transactionRoutes.js
├── views/                   # Template tampilan EJS (file HTML yang dirender server)
│   ├── auth/                # Tampilan khusus untuk autentikasi (login, register)
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── categories/
│   ├── dashboard.ejs
│   ├── items/
│   ├── partials/            # Bagian tampilan yang dapat digunakan kembali (header, footer)
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── reports/
│   └── transactions/
├── app.js                   # File utama aplikasi Express (titik masuk server)
├── package.json             # Detail proyek, daftar dependensi, dan skrip Node.js
└── README.md                # File dokumentasi proyek ini (yang sedang Anda baca)
Kontribusi
Kontribusi Anda sangat kami hargai dan akan membantu meningkatkan kualitas aplikasi ini! Jika Anda menemukan bug, memiliki ide fitur baru, atau ingin melakukan perbaikan kode, silakan ikuti panduan kontribusi di bawah ini:

Fork Repositori:
Klik tombol "Fork" di bagian kanan atas halaman repositori GitHub ini untuk membuat salinan repositori ke akun Anda.
Klon Repositori Anda:
Klon repositori yang sudah Anda fork ke mesin lokal Anda:
Bash

git clone https://github.com/YourUsername/Inventory-app.git
cd Inventory-app
Ganti YourUsername dengan nama pengguna GitHub Anda.
Buat Branch Baru:
Buat branch baru untuk perubahan Anda. Selalu bekerja di branch terpisah untuk menjaga branch utama tetap bersih:
Bash

git checkout -b feature/nama-fitur-baru
Ganti feature/nama-fitur-baru dengan nama yang deskriptif untuk fitur atau perbaikan yang Anda kerjakan (misalnya feature/add-dark-mode atau fix/bug-login-error).
Lakukan Perubahan Anda:
Tulis kode Anda, perbaiki bug, atau tambahkan fitur baru.
Tambahkan Perubahan ke Staging Area:
Setelah selesai dengan perubahan Anda, tambahkan file-file yang dimodifikasi ke staging area:
Bash

git add .
Lakukan Commit:
Simpan perubahan Anda dengan pesan commit yang jelas dan ringkas:
Bash

git commit -m "feat: Menambahkan fitur X"
Gunakan awalan seperti feat: untuk fitur baru, fix: untuk perbaikan bug, docs: untuk perubahan dokumentasi, dll.
Dorong Perubahan ke Repositori Anda:
Unggah commit Anda ke repositori GitHub yang sudah Anda fork:
Bash

git push origin feature/nama-fitur-baru
Buat Pull Request:
Setelah push berhasil, buka halaman repositori Anda di GitHub. Anda akan melihat tombol untuk "Compare & pull request". Klik tombol tersebut dan ikuti instruksi untuk membuat Pull Request baru ke repositori asli. Jelaskan perubahan Anda dengan detail di deskripsi Pull Request.
Terima kasih atas kontribusi Anda!

Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT. Ini berarti Anda bebas untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan/atau menjual salinan perangkat lunak, asalkan salinan lisensi dan pemberitahuan hak cipta disertakan.