// app.js
require('dotenv').config(); // Memuat variabel lingkungan dari .env
require('./config/passport');
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { sequelize, Item, Transaction, Category, User } = require('./models');

const PORT = process.env.PORT || 3000;
// Impor router
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes'); 
const authRoutes = require('./routes/authRoutes');

// Konfigurasi EJS sebagai View Engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Direktori tempat file .ejs berada

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Middleware untuk parsing body dari form HTML
// app.use(express.urlencoded({ extended: true }));
// Konfigurasi session
app.use(session({
    secret: 'iniadalahsecretkeyyangsangatkuat', // Ganti dengan string acak yang kuat
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Sesi berlaku 1 hari
}));
app.use(flash());
// Inisialisasi Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Middleware untuk membuat user tersedia di semua template EJS (opsional)
app.use((req, res, next) => {
    res.locals.user = req.user; // req.user berisi objek user jika sudah login
    next();
});

// Melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan router
// app.use('/dashboard', dashboardRoutes);
// app.use('/items', itemRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/transactions', transactionRoutes);
// app.use('/reports', reportRoutes);
// Gunakan router
app.use('/auth', authRoutes); // <-- Tambahkan ini untuk route login/register
// Lindungi route dashboard dan lainnya
app.use('/dashboard', ensureAuthenticated, dashboardRoutes); // Proteksi dashboard
app.use('/items', ensureAuthenticated, itemRoutes);
app.use('/categories', ensureAuthenticated, categoryRoutes);
app.use('/transactions', ensureAuthenticated, transactionRoutes);
app.use('/reports', ensureAuthenticated, reportRoutes);


// Middleware untuk memastikan user sudah login
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Metode dari Passport.js
        return next();
    }
    req.session.returnTo = req.originalUrl; // Simpan URL yang diminta
    res.redirect('/auth/login'); // Redirect ke halaman login jika belum login
}
// Redirect default ke halaman items
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ada yang salah!');
});

// Server mendengarkan di port yang ditentukan
// app.listen(PORT, () => {
//     console.log(`Inventory app listening on port ${PORT}`);
// });

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });