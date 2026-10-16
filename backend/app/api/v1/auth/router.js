const express = require('express');
const router = express.Router(); // Gunakan express.Router()

// Import controller yang sudah kita buat sebelumnya
const { signinCms } = require('./controller');

// Endpoint GET hanya untuk tes
router.get('/auth', (req, res) => {
    res.status(200).json({
        message: "Halaman Auth",
    });
});

// Endpoint POST untuk Signin
router.post('/signin', signinCms);

module.exports = router;