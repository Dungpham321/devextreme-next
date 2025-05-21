const express = require('express');
const router = express.Router();
const DangNhapController = require("../controllers/DangnhapController");
router.route('/:op').post(new DangNhapController().post);

module.exports = router;