// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models'); // Impor model User Anda

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username: username } });

            if (!user) {
                return done(null, false, { message: 'Username tidak ditemukan.' });
            }

            // Gunakan metode checkPassword yang sudah dibuat di model User
            if (!user.checkPassword(password)) {
                return done(null, false, { message: 'Password salah.' });
            }

            return done(null, user); // Autentikasi berhasil, kirim objek user
        } catch (error) {
            return done(error);
        }
    }
));

// Serialisasi user: menyimpan ID user ke dalam sesi
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialisasi user: mengambil objek user dari ID yang disimpan di sesi
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport; // Ekspor konfigurasi passport