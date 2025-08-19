const HT_MENU_ITEM = require("./HT_MENU_ITEM");
const Collection = require("./Collection");
module.exports = class HT_MENU_ITEMCollection extends Collection {
    GetAll() {
        const data = HT_MENU_ITEM.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_MENU_ITEM.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async GetByMID(MID, HIDEN = false){
        const result = await HT_MENU_ITEM.find({ 
            MID: this.ObjectId(MID),
            HIDEN: HIDEN
        }).sort({WEIGHT: 1});
        return result;
    }
    async GetbyUrl(MID, URL){
        const result = await HT_MENU_ITEM.findOne({
            MID: this.ObjectId(MID),
            HREF:URL
        });
        return result;
    }

    async Create(item) {
       const newMenu =  await HT_MENU_ITEM.create(item);
       return newMenu;
    }
    async Update(id, data) {
        await HT_MENU_ITEM.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await HT_MENU_ITEM.findByIdAndDelete(id);
    }
}