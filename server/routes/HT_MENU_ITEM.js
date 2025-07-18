const express = require('express');
const router = express.Router();
const HT_MENU_ITEMController = require("../controllers/HETHONG/HT_MENU_ITEMController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_MENU_ITEMController().get);
router.route('/:op').post(verify,new HT_MENU_ITEMController().post);
router.route('/:id').put(verify,new HT_MENU_ITEMController().put);
module.exports = router;