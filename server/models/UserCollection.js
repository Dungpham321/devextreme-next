const User = require("./user");
module.exports = class UserCollection {
    GetAllUser(){
        const data = User.find({});
        return data;
    };
    async GetByTendangNhap(tendangnhap) {
        const data =await User.findOne({ten_dang_nhap:tendangnhap});
        return data;
    };
    async Create(item){
      await User.create(item);
    }
}