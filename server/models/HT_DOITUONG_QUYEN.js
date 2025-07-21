const mongoose = require('mongoose');
const HT_DOITUONG_QUYENSchema = new mongoose.Schema({
    DOITUONG_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'HT_NHOMQUYEN'},
    DOITUONG_LOAI: { type: String },
    QUYEN: { type: String },
    CHUCNANG: {type: String},
    ngaytao: { type: Date, default: Date.now }
});
module.exports = mongoose.model("HT_DOITUONG_QUYEN",HT_DOITUONG_QUYENSchema, 'HT_DOITUONG_QUYEN');