const homeController = require('../controllers/homeControllers');
const express = require('express');
const router = express.Router();

router.get('/', homeController.home);

module.exports = router;