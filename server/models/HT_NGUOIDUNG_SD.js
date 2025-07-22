const mongoose = require('mongoose');
const HT_NGUOIDUNG_SDSchema = new mongoose.Schema({
    NGUOIDUNG_ID: {type: mongoose.Schema.Types.ObjectId,  ref: 'HT_NGUOIDUNG'},
    DOITUONG_ID: {type: mongoose.Schema.Types.ObjectId},
    DOITUONG_LOAI: { type: String },
    CHUCNANG: {type: String},
    DATA: {type: String},
    ngaytao: { type: Date, default: Date.now }
});
module.exports = mongoose.model("HT_NGUOIDUNG_SD",HT_NGUOIDUNG_SDSchema, 'HT_NGUOIDUNG_SD');