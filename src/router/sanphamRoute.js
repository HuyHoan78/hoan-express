const sanphamController = require('../controllers/sanphamControllers');
const express = require('express');
const router = express.Router();

router.get('/sanpham', sanphamController.getsanphamAll);
router.get('/sanpham/show/:id', sanphamController.getsanphamById);
router.post('/sanpham/create', sanphamController.createsanpham);
router.get('/sanpham/create', sanphamController.createsanpham1);
router.post('/sanpham/update/:id', sanphamController.updatesanpham);
router.get('/sanpham/update/:id', sanphamController.updatesanpham1);
router.delete('/sanpham/delete/:id', sanphamController.deletesanpham);


module.exports = router;