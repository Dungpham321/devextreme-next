const HT_MENU = require("./HT_MENU");
const Collection = require("./Collection");
module.exports = class HT_MENUCollection extends Collection {
    GetAll() {
        const data = HT_MENU.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_MENU.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
       const newMenu =  await HT_MENU.create(item);
       return newMenu;
    }
    async Update(id, data) {
        await HT_MENU.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await HT_MENU.findByIdAndDelete(id);
    }
}