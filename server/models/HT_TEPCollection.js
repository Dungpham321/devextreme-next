const HT_TEP = require("./HT_TEP");
const Collection = require("./Collection");
module.exports = class HT_TEPCollection extends Collection {
    GetAll() {
        const data = HT_TEP.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_TEP.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Get(Ids){
        const objectIds = Ids.map(id => new mongoose.Types.ObjectId(id));
        const result = await HT_TEP.find({ _id: { $in: objectIds } });
        return result;
    }
    async Create(item) {
       const newNhomQuyen =  await HT_TEP.create(item);
       return newNhomQuyen;
    }
    async Update(id, data) {
        await HT_TEP.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await HT_TEP.findByIdAndDelete(id);
    }
}