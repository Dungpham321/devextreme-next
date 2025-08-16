const express = require('express');
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");
const verify = require('../Middleware/verifyJWT');
router.route('/:op').get(verify,new DashboardController().get);
router.route('/:op').post(verify,new DashboardController().post);
module.exports = router;