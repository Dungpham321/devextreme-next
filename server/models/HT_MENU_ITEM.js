const mongoose = require('mongoose');
const HT_MENU_ITEMSchema = new mongoose.Schema({
 MID: { type: mongoose.Schema.Types.ObjectId, ref: 'HT_MENU', required: true },
 PID: {type: mongoose.Schema.Types.ObjectId, ref: 'HT_MENU_ITEM'},
 NAME:{type:String},
 HREF:{type:String},
 PERM:{type:String},
 WEIGHT:{type:String},
 HIDEN:{type:Boolean},
 ICON:{type:String},
 NGAYTAO: {type: Date, default: Date.now}
});
module.exports = mongoose.model("HT_MENU_ITEM",HT_MENU_ITEMSchema, 'HT_MENU_ITEM');