const express = require('express');
const router = express.Router();
const HT_NHOMQUYENController = require("../controllers/HETHONG/HT_NHOMQUYENController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_NHOMQUYENController().get);
router.route('/:op').post(verify,new HT_NHOMQUYENController().post);
router.route('/:id').put(verify,new HT_NHOMQUYENController().put);
module.exports = router;