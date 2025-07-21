const mongoose = require('mongoose');
const HT_NHOMQUYENSchema = new mongoose.Schema({
    TEN: {type: String},
    MO_TA: { type: String },
    VI_TRI: { type: Number },
    TRANG_THAI: {type: Number},
    ngaytao: { type: Date, default: Date.now }
});
module.exports = mongoose.model("HT_NHOMQUYEN",HT_NHOMQUYENSchema, 'HT_NHOMQUYEN');