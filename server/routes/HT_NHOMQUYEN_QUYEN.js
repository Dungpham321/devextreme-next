const express = require('express');
const router = express.Router();
const HT_NHOMQUYEN_QUYENController = require("../controllers/HETHONG/HT_NHOMQUYEN_QUYENController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new HT_NHOMQUYEN_QUYENController().get);
router.route('/:op').post(verify,new HT_NHOMQUYEN_QUYENController().post);
router.route('/:id').put(verify,new HT_NHOMQUYEN_QUYENController().put);
module.exports = router;