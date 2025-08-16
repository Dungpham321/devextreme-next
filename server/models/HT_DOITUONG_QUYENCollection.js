const HT_DOITUONG_QUYEN = require("./HT_DOITUONG_QUYEN");
const HT_NGUOIDUNG_SD = require("./HT_NGUOIDUNG_SD");
const Collection = require("./Collection");
module.exports = class HT_DOITUONG_QUYENCollection extends Collection {
    GetAll() {
        const data = HT_DOITUONG_QUYEN.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_DOITUONG_QUYEN.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
        const newItem = await HT_DOITUONG_QUYEN.create(item);
        return newItem;
    }
    async Update(id, data) {
        await HT_DOITUONG_QUYEN.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id) {
        await HT_DOITUONG_QUYEN.findByIdAndDelete(id);
    }
    async GetByDOITUONG_ID(DOITUONG_ID, DOITUONG_LOAI, CHUCNANG) {
        const result = await HT_DOITUONG_QUYEN.find({
            DOITUONG_ID: DOITUONG_ID,
            DOITUONG_LOAI: DOITUONG_LOAI,
            CHUCNANG: CHUCNANG
        });
        return result
    }
    async GetByDsDOITUONG_ID(DOITUONG_IDs){
        const result = await HT_DOITUONG_QUYEN.find({
            DOITUONG_ID: { $in: DOITUONG_IDs },
            DOITUONG_LOAI: "DM_DANHMUC",
            CHUCNANG: "HT_NHOMQUYEN"
        });
        return result
    }
    async InsertBulk(items) {
        await HT_DOITUONG_QUYEN.insertMany(items);
    }
    async DeleteBulk(items) {
        await HT_DOITUONG_QUYEN.deleteMany({
            _id: { $in: items.map(item => item._id) }
        });
    }
}