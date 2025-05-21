const User = require("./user");
const Collection = require("./Collection");
module.exports = class UserCollection extends Collection {
    GetAllUser() {
        const data = User.find({}).select("-mat_khau");
        return data;
    };
    async GetByTendangNhap(tendangnhap) {
        const data = await User.findOne({ ten_dang_nhap: tendangnhap });
        return data;
    };
    async GetById(id) {
        const result = await User.findOne({ _id: this.ObjectId(id) });
        return result;
    }
    async Create(item) {
       const newUser =  await User.create(item);
       return newUser;
    }
    async Update(id, data) {
        await User.updateOne(
            { _id: this.ObjectId(id) },
            { $set: data }
        );
    }
    async Delete(id){
        await User.findByIdAndDelete(id);
    }
}