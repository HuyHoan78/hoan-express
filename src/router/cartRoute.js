const cartController = require('../controllers/cartControllers');
const express = require('express');
const router = express.Router();

router.get('/cart', cartController.home);

module.exports = router;