const nhacungcapController = require('../controllers/nhacungcapControllers');
const express = require('express');
const router = express.Router();

router.get('/nhacungcap', nhacungcapController.getnhacungcapAll);
router.get('/nhacungcap/show/:id', nhacungcapController.getnhacungcapById);
router.post('/nhacungcap/create', nhacungcapController.createnhacungcap);
router.get('/nhacungcap/create', nhacungcapController.createnhacungcap1);
router.post('/nhacungcap/update/:id', nhacungcapController.updatenhacungcap);
router.get('/nhacungcap/update/:id', nhacungcapController.updatenhacungcap1);
router.delete('/nhacungcap/delete/:id', nhacungcapController.deletenhacungcap);

module.exports = router;