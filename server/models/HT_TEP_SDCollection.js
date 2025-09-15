const HT_TEP_SD = require("./HT_TEP_SD");
const Collection = require("./Collection");
module.exports = class HT_TEP_SDCollection extends Collection {
    GetAll() {
        const data = HT_TEP_SD.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_TEP_SD.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
       const newNhomQuyen =  await HT_TEP_SD.create(item);
       return newNhomQuyen;
    }
    async Update(id, data) {
        await HT_TEP_SD.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await HT_TEP_SD.findByIdAndDelete(id);
    }
}