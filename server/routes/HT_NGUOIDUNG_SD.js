const express = require('express');
const router = express.Router();
const HT_NGUOIDUNG_SDController = require("../controllers/HETHONG/HT_NGUOIDUNG_SDController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_NGUOIDUNG_SDController().get);
router.route('/:op').post(verify,new HT_NGUOIDUNG_SDController().post);
router.route('/:id').put(verify,new HT_NGUOIDUNG_SDController().put);
module.exports = router;