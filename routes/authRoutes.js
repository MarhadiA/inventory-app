// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models'); // Impor model User

// Route untuk menampilkan halaman register
router.get('/register', (req, res) => {
    res.render('auth/register', { errors: req.session.errors || [] });
    req.session.errors = []; // Bersihkan error setelah ditampilkan
});

// Route untuk menangani proses register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        // Tangani error validasi atau username sudah ada
        console.error('Error registering user:', error);
        req.session.errors = error.errors ? error.errors.map(e => e.message) : ['Gagal mendaftar. Username mungkin sudah digunakan.'];
        res.redirect('/auth/register');
    }
});

// Route untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.render('auth/login', { error: req.flash('error') || '' }); // Menggunakan flash message
});

// Route untuk menangani proses login
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true // Aktifkan flash message untuk pesan error login
}), (req, res) => {
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(returnTo || '/dashboard'); // Redirect ke URL yang diminta atau dashboard
});

// Route untuk logout
router.get('/logout', (req, res) => {
    req.logout((err) => { // req.logout memerlukan callback di Passport.js >= 0.6.0
        if (err) {
            return next(err);
        }
        req.session.destroy(() => { // Hancurkan sesi setelah logout
            res.redirect('/auth/login');
        });
    });
});

module.exports = router;