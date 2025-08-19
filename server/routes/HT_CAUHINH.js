const express = require('express');
const router = express.Router();
const HT_CAUHINHController = require("../controllers/HETHONG/HT_CAUHINHController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_CAUHINHController().get);
router.route('/:op').post(verify,new HT_CAUHINHController().post);
module.exports = router;