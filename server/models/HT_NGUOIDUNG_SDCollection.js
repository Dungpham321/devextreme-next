const HT_NGUOIDUNG_SD = require("./HT_NGUOIDUNG_SD");
const Collection = require("./Collection");
module.exports = class HT_NGUOIDUNG_SDCollection extends Collection {
    GetAll() {
        const data = HT_NGUOIDUNG_SD.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_NGUOIDUNG_SD.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
        const newItem = await HT_NGUOIDUNG_SD.create(item);
        return newItem;
    }
    async Update(id, data) {
        await HT_NGUOIDUNG_SD.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id) {
        await HT_NGUOIDUNG_SD.findByIdAndDelete(id);
    }
    async GetByDOITUONG_ID(DOITUONG_ID, DOITUONG_LOAI, CHUCNANG) {
        const result = await HT_NGUOIDUNG_SD.find({
            DOITUONG_ID: DOITUONG_ID,
            DOITUONG_LOAI: DOITUONG_LOAI,
            CHUCNANG: CHUCNANG
        });
        return result
    }
    async InsertBulk(items) {
        await HT_NGUOIDUNG_SD.insertMany(items);
    }
    async DeleteBulk(items) {
        await HT_NGUOIDUNG_SD.deleteMany({
            _id: { $in: items.map(item => item._id) }
        });
    }
}