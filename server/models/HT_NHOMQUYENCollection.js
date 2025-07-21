const HT_NHOMQUYEN = require("./HT_NHOMQUYEN");
const Collection = require("./Collection");
module.exports = class HT_NHOMQUYENCollection extends Collection {
    GetAll() {
        const data = HT_NHOMQUYEN.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_NHOMQUYEN.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
       const newNhomQuyen =  await HT_NHOMQUYEN.create(item);
       return newNhomQuyen;
    }
    async Update(id, data) {
        await HT_NHOMQUYEN.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await HT_NHOMQUYEN.findByIdAndDelete(id);
    }
}