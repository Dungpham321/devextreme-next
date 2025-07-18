const express = require('express');
const router = express.Router();
const HT_MENUController = require("../controllers/HETHONG/HT_MENUController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_MENUController().get);
router.route('/:op').post(verify,new HT_MENUController().post);
router.route('/:id').put(verify,new HT_MENUController().put);
module.exports = router;