const mongoose = require('mongoose');
const HT_TEP_SDchema = new mongoose.Schema({
    TEP_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'HT_TEP' },
    DOITUONG_ID: { type: String },
    CHUCNANG: { type: String },
    DOITUONG_LOAI: { type: String },
    ND_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose.model("HT_TEP_SD", HT_TEP_SDchema, 'HT_TEP_SD');