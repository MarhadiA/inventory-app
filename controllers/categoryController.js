// controllers/categoryController.js
const { Op } = require('sequelize'); // Meskipun tidak dipakai di sini, biasanya diimpor
const { Category } = require('../models'); // Impor model

class CategoryController {
    static async listCategories(req, res) {
        try {
            const categories = await Category.findAll({ order: [['name', 'ASC']] });
            res.render('categories/list', { categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.send('Terjadi kesalahan saat mengambil data kategori.');
        }
    }

    static async addCategoryForm(req, res) {
        res.render('categories/add-form');
    }

    static async createCategory(req, res) {
        try {
            const { name, description } = req.body;
            const errors = [];
            if (!name || name.trim() === '') errors.push('Nama kategori wajib diisi.');

            if (errors.length > 0) {
                return res.render('categories/add-form', { errors, category: req.body });
            }

            await Category.create({ name, description });
            res.redirect('/categories');
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.render('categories/add-form', {
                    errors: ['Nama kategori sudah ada. Mohon gunakan nama lain.'],
                    category: req.body
                });
            }
            console.error('Error adding category:', error);
            res.send('Terjadi kesalahan saat menambahkan kategori.');
        }
    }

    static async editCategoryForm(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).send('Kategori tidak ditemukan.');
            }
            res.render('categories/edit-form', { category });
        } catch (error) {
            console.error('Error rendering edit category form:', error);
            res.send('Terjadi kesalahan saat memuat form edit kategori.');
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const errors = [];
            if (!name || name.trim() === '') errors.push('Nama kategori wajib diisi.');

            if (errors.length > 0) {
                const category = await Category.findByPk(id);
                return res.render('categories/edit-form', { errors, category: { ...category.toJSON(), ...req.body } });
            }

            const existingCategory = await Category.findOne({ where: { name: name, id: { [Op.ne]: id } } });
            if (existingCategory) {
                const category = await Category.findByPk(id);
                return res.render('categories/edit-form', {
                    errors: ['Nama kategori sudah digunakan oleh kategori lain. Mohon gunakan nama unik.'],
                    category: { ...category.toJSON(), ...req.body }
                });
            }

            await Category.update(
                { name, description },
                { where: { id: id } }
            );
            res.redirect('/categories');
        } catch (error) {
            console.error('Error editing category:', error);
            res.send('Terjadi kesalahan saat mengedit kategori.');
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            await Category.destroy({ where: { id: id } });
            res.redirect('/categories');
        } catch (error) {
            console.error('Error deleting category:', error);
            res.send('Terjadi kesalahan saat menghapus kategori.');
        }
    }
}

module.exports = CategoryController;