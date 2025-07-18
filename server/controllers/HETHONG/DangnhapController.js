const json = require("body-parser/lib/types/json");
const user = require("../../models/user");
const baseController = require("../baseController");
const bcrypt = require('bcrypt');
const { RequestState } = require("../../Library/Enum");

module.exports = class DangNhapController extends baseController{
    post = async(req,res) =>{
        const op = req.params.op;
        if(op == "login"){
            const data = Object(req.body);
            const objHT_NGUOIDUNG =await this.db.UserCollection.GetByTendangNhap(data.ten_dang_nhap);
            if(objHT_NGUOIDUNG != null){
                const match = await bcrypt.compare(data.mat_khau, objHT_NGUOIDUNG.mat_khau);
                if(match){
                    const datatoken = {
                        ten_dang_nhap: objHT_NGUOIDUNG.ten_dang_nhap,
                        email: objHT_NGUOIDUNG.email,
                    };
                    const token = this.CreateToken(datatoken);
                    const Data = {
                        id: objHT_NGUOIDUNG._id,
                        ten_dang_nhap: objHT_NGUOIDUNG.ten_dang_nhap,
                        email: objHT_NGUOIDUNG.email,
                        Accesstoken: token
                    }
                    return this.ObjectResult(res,Data);
                }else{
                    return this.ObjectResult(res,null,RequestState.Failed,"Mật khẩu không đúng");
                }
            }else{
                return this.ObjectResult(res,null,RequestState.Failed,"Tên đăng nhập không tồn tại");
            }
    
        }else if(op == "register"){
            const data = Object(req.body);
            const fields = this.Mapfields(user.schema, data);
            fields.mat_khau = await bcrypt.hash(fields.mat_khau, 10);
            fields.ngay_tao = new Date();
            const objHT_NGUOIDUNG = await this.db.UserCollection.GetByTendangNhap(fields.ten_dang_nhap);
            if(objHT_NGUOIDUNG == null){
                const id =  this.db.UserCollection.Create(fields);
                return this.ObjectResult(res, id , RequestState.Success, "Đăng ký thành công");
            }
            else {
                return this.ObjectResult(res,null, RequestState.Failed, "Tên đăng nhập đã tồn tại");
            }
             
        }
    }
}
