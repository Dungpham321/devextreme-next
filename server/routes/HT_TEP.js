const express = require('express');
const router = express.Router();
const HT_TEPController = require("../controllers/HETHONG/HT_TEPController");
const verify = require('../Middleware/verifyJWT');
const upload = require('../Middleware/multerConfig');

router.route('/:op').get(verify, new HT_TEPController().get);
router.route('/:op').post(verify, new HT_TEPController().post);
router.route('/Upload/:PATH').post(verify, upload.single('file'), new HT_TEPController().PostFile);
router.route('/:id').put(verify, new HT_TEPController().put);

module.exports = router;