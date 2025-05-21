const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
 ten_sp:{type: String},
 mota:{type:String},
 gia:{type: Number},
 soluong:{type:Number}, //số lượng hàng tồn kho 
 danhmuc_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'DM_DANHMUCSP'},
 anhsp:[String],
 // Danh sách các tùy chọn sản phẩm (ví dụ: màu sắc, kích thước, bộ nhớ)
 options:[
    {
        name: { type: String, required: true }, // Tên tùy chọn (ví dụ: màu sắc)
        values: [
            {
                giatri: { type: String, required: true }, // Giá trị tùy chọn (ví dụ: đỏ, xanh)
                giacongthem: { type: Number, default: 0 }, // Giá cộng thêm nếu có
                soluongton_kho: { type: Number, default: 0 } // Số lượng tồn kho của tùy chọn này
            }
        ]

    }
 ],
ngaytao:{type: Date,default: Date.now}
});
module.exports = mongoose.model("SP_SANPHAM",ProductSchema, 'SP_SANPHAM');