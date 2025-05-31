// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController'); // Impor controller

router.get('/', CategoryController.listCategories); // Daftar semua kategori
router.get('/add', CategoryController.addCategoryForm); // Form tambah kategori
router.post('/add', CategoryController.createCategory); // Proses tambah kategori
router.get('/edit/:id', CategoryController.editCategoryForm); // Form edit kategori
router.post('/edit/:id', CategoryController.updateCategory); // Proses edit kategori
router.get('/delete/:id', CategoryController.deleteCategory); // Proses hapus kategori

module.exports = router;