const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HT_NGUOIDUNG', required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
    total_price: { type: Number, required: true },
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SP_SANPHAM' },
            quantity: Number,
            price: Number
        }
    ],
    coupon_code: String

});
module.exports = mongoose.model("SP_ORDER",OrderSchema, 'SP_ORDER');