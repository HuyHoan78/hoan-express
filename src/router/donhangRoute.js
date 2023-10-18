const donhangController = require('../controllers/donhangControllers');
const express = require('express');
const router = express.Router();

router.get('/donhang', donhangController.getdonhangAll);
router.get('/donhang/:id', donhangController.getdonhangById);
router.post('/donhang', donhangController.createdonhang);
router.post('/donhang/update/:id', donhangController.updatedonhang);
router.delete('/donhang/delete/:id', donhangController.deletedonhang);

module.exports = router;