const khachhangController = require('../controllers/khachhangControllers');
const express = require('express');
const router = express.Router();

router.get('/khachhang', khachhangController.getkhachhangAll);
router.get('/khachhang/show/:id', khachhangController.getkhachhangById);
router.post('/khachhang/create', khachhangController.createkhachhang);
router.get('/khachhang/create', khachhangController.createkhachhang1);
router.post('/khachhang/update/:id', khachhangController.updatekhachhang);
router.get('/khachhang/update/:id', khachhangController.updatekhachhang1);
router.delete('/khachhang/delete/:id', khachhangController.deletekhachhang);

module.exports = router;