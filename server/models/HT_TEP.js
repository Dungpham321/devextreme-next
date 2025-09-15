const mongoose = require('mongoose');
const HT_TEPchema = new mongoose.Schema({
    NGUOIDUNG_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    TEN_TEP: { type: String },
    DUONG_DAN: { type: String },
    KIEU_TEP: { type: String },
    KICH_THUOC: { type: Number },
    TRANG_THAI: { type: Number },
    TEN_BAN_DAU: { type: String },
    KY_SO: { type: Boolean },
    TGROUP: { type: String }.type,
    ngaytao: { type: Date, default: Date.now }
});
module.exports = mongoose.model("HT_TEP", HT_TEPchema, 'HT_TEP');