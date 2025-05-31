// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController'); // Impor controller

router.get('/', ItemController.listItems); // Daftar semua barang
router.get('/add', ItemController.addItemForm); // Form tambah barang
router.post('/add', ItemController.createItem); // Proses tambah barang
router.get('/edit/:id', ItemController.editItemForm); // Form edit barang
router.post('/edit/:id', ItemController.updateItem); // Proses edit barang
router.get('/delete/:id', ItemController.deleteItem); // Proses hapus barang

module.exports = router;