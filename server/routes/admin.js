const express = require('express');

const adminController = require('../controllers/admin.js');

const router = express.Router();

router.post('/add-product', adminController.postAddProduct);

router.delete('/product/:productId', adminController.deleteProduct);

module.exports = router;