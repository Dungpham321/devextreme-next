const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
    ma: {type: String},
    ten: { type: String },
    mota: { type: String },
    ngaytao: { type: Date, default: Date.now }
});
module.exports = mongoose.model("HT_MENU", MenuSchema, 'HT_MENU');