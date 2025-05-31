// controllers/itemController.js
const { Op } = require('sequelize');
const { Category, Item } = require('../models'); // Impor model

class ItemController {
    static async listItems(req, res) {
        try {
            const { search } = req.query;
            let items;

            if (search) {
                items = await Item.findAll({
                    where: {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${search}%` } },
                            { description: { [Op.iLike]: `%${search}%` } }
                        ]
                    },
                    include: { model: Category, as: 'Category' },
                    order: [['name', 'ASC']]
                });
            } else {
                items = await Item.findAll({
                    include: { model: Category, as: 'Category' },
                    order: [['id', 'ASC']]
                });
            }
            res.render('items/list', { items, search });
        } catch (error) {
            console.error('Error fetching items:', error);
            res.send('Terjadi kesalahan saat mengambil data barang.');
        }
    }

    static async addItemForm(req, res) {
        try {
            const categories = await Category.findAll({ order: [['name', 'ASC']] });
            res.render('items/add-form', { categories });
        } catch (error) {
            console.error('Error rendering add item form:', error);
            res.send('Terjadi kesalahan saat memuat form tambah barang.');
        }
    }

    static async createItem(req, res) {
        try {
            const { name, description, quantity, price, entryDate, CategoryId } = req.body;
            const errors = [];
            if (!name || name.trim() === '') errors.push('Nama barang wajib diisi.');
            if (quantity < 0) errors.push('Jumlah tidak boleh kurang dari 0.');
            if (price < 1) errors.push('Harga tidak boleh kurang dari 1.');
            if (!entryDate) errors.push('Tanggal masuk wajib diisi.');
            if (!CategoryId) errors.push('Kategori wajib dipilih.');

            if (errors.length > 0) {
                const categories = await Category.findAll({ order: [['name', 'ASC']] });
                return res.render('items/add-form', { errors, categories, item: req.body });
            }

            await Item.create({ name, description, quantity, price, entryDate, CategoryId });
            res.redirect('/items');
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                const categories = await Category.findAll({ order: [['name', 'ASC']] });
                return res.render('items/add-form', {
                    errors: ['Nama barang sudah ada. Mohon gunakan nama lain.'],
                    categories,
                    item: req.body
                });
            }
            console.error('Error adding item:', error);
            res.send('Terjadi kesalahan saat menambahkan barang.');
        }
    }

    static async editItemForm(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).send('Barang tidak ditemukan.');
            }
            const categories = await Category.findAll({ order: [['name', 'ASC']] });
            res.render('items/edit-form', { item, categories });
        } catch (error) {
            console.error('Error rendering edit item form:', error);
            res.send('Terjadi kesalahan saat memuat form edit barang.');
        }
    }

    static async updateItem(req, res) {
        try {
            const { id } = req.params;
            const { name, description, quantity, price, entryDate, CategoryId } = req.body;

            const errors = [];
            if (!name || name.trim() === '') errors.push('Nama barang wajib diisi.');
            if (quantity < 0) errors.push('Jumlah tidak boleh kurang dari 0.');
            if (price < 1) errors.push('Harga tidak boleh kurang dari 1.');
            if (!entryDate) errors.push('Tanggal masuk wajib diisi.');
            if (!CategoryId) errors.push('Kategori wajib dipilih.');

            if (errors.length > 0) {
                const categories = await Category.findAll({ order: [['name', 'ASC']] });
                const item = await Item.findByPk(id);
                return res.render('items/edit-form', { errors, categories, item: { ...item.toJSON(), ...req.body } });
            }

            const existingItem = await Item.findOne({ where: { name: name, id: { [Op.ne]: id } } });
            if (existingItem) {
                const categories = await Category.findAll({ order: [['name', 'ASC']] });
                const item = await Item.findByPk(id);
                return res.render('items/edit-form', {
                    errors: ['Nama barang sudah digunakan oleh barang lain. Mohon gunakan nama unik.'],
                    categories,
                    item: { ...item.toJSON(), ...req.body }
                });
            }

            await Item.update(
                { name, description, quantity, price, entryDate, CategoryId },
                { where: { id: id } }
            );
            res.redirect('/items');
        } catch (error) {
            console.error('Error editing item:', error);
            res.send('Terjadi kesalahan saat mengedit barang.');
        }
    }

    static async deleteItem(req, res) {
        try {
            const { id } = req.params;
            await Item.destroy({ where: { id: id } });
            res.redirect('/items');
        } catch (error) {
            console.error('Error deleting item:', error);
            res.send('Terjadi kesalahan saat menghapus barang.');
        }
    }
}

module.exports = ItemController;