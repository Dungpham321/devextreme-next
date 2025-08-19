const HT_CAUHINH = require("./HT_CAUHINH");
const Collection = require("./Collection");
module.exports = class HT_CAUHINHCollection extends Collection {
    GetAll() {
        const data = HT_CAUHINH.find({});
        return data;
    };
    async GetById(id) {
        const result = await HT_CAUHINH.findOne({ _id: this.ObjectId(id) });
        return result;
    }

    async GetByMa(MA) {
        const result = await HT_CAUHINH.findOne({ MA: MA });
        return result;
    }
    async Create(item) {
        const newMenu = await HT_CAUHINH.create(item);
        return newMenu;
    }
    async CreateMA(MA, ITEMS) {
        await HT_CAUHINH.updateOne(
            { MA: MA },
            { $set: { GIA_TRI: ITEMS } },
            { upsert: true }
        );
    }
    async Update(id, data) {
        await HT_CAUHINH.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id) {
        await HT_CAUHINH.findByIdAndDelete(id);
    }
}