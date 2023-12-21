const donhangController = require('../controllers/donhangControllers');
const express = require('express');
const router = express.Router();

router.get('/donhang', donhangController.getdonhangAll);
router.get('/donhang/show/:id', donhangController.getdonhangById);
router.post('/donhang/create', donhangController.createdonhang);
router.get('/donhang/create', donhangController.createdonhang1);
router.post('/donhang/update/:id', donhangController.updatedonhang);
router.get('/donhang/update/:id', donhangController.updatedonhang1);
router.delete('/donhang/delete/:id', donhangController.deletedonhang);

module.exports = router;