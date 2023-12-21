const productController = require('../controllers/productControllers');
const express = require('express');
const router = express.Router();

router.get('/product', productController.product);

module.exports = router;