const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const verify = require('../Middleware/verifyJWT');


router.route('/:op').get(verify,new userController().get);
router.route('/:op').post(new userController().post);

module.exports = router;