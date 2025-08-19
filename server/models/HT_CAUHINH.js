const mongoose = require('mongoose');
const HT_CAUHINHSchema = new mongoose.Schema({
    MA: { type: String },
    GIA_TRI: { type: mongoose.Schema.Types.Mixed }
});
module.exports = mongoose.model("HT_CAUHINH", HT_CAUHINHSchema, 'HT_CAUHINH');