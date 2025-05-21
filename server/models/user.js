const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 ten_dang_nhap:{type: String},
 mat_khau:{type:String},
 ho_ten:{type: String},
 email:{type:String},
 so_dien_thoai:{type: String},
 dia_chi:{type: String},
 role:{type:String},
 ngay_tao:{type: Date,default: Date.now},
});
module.exports = mongoose.model("HT_NGUOIDUNG",userSchema, 'HT_NGUOIDUNG');