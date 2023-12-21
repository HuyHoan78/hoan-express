const nhanvienController = require('../controllers/nhanvienControllers');
const express = require('express');
const router = express.Router();

router.get('/nhanvien', nhanvienController.getnhanvienAll);
router.get('/nhanvien/show/:id', nhanvienController.getnhanvienById);
router.post('/nhanvien/create', nhanvienController.createnhanvien);
router.get('/nhanvien/create', nhanvienController.createnhanvien1);
router.post('/nhanvien/update/:id', nhanvienController.updatenhanvien);
router.get('/nhanvien/update/:id', nhanvienController.updatenhanvien1);
router.delete('/nhanvien/delete/:id', nhanvienController.deletenhanvien);

module.exports = router;