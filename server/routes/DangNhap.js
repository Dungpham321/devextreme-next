const express = require('express');
const router = express.Router();
const DangNhapController = require("../controllers/HETHONG/DangnhapController");
router.route('/:op').post(new DangNhapController().post);

module.exports = router;