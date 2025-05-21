const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
 ten_danhmuc:{type: String},
 mota:{type:String},
 ngaytao:{type: Date,default: Date.now}
});
module.exports = mongoose.model("DM_DANHMUCSP",CategorySchema, 'DM_DANHMUCSP');