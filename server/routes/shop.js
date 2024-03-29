const express = require('express');

const shopController = require('../controllers/shop.js');

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCartAddProduct);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);


module.exports = router;