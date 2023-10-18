const khachhangController = require('../controllers/khachhangControllers');
const express = require('express');
const router = express.Router();

router.get('/khachhang', khachhangController.getkhachhangAll);
router.get('/khachhang/:id', khachhangController.getkhachhangById);
router.post('/khachhang', khachhangController.createkhachhang);
router.post('/khachhang/update/:id', khachhangController.updatekhachhang);
router.delete('/khachhang/delete/:id', khachhangController.deletekhachhang);

module.exports = router;