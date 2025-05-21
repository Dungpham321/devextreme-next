const user = require("../models/user");
const baseController = require("./baseController");

module.exports = class userController extends baseController{

    get = async(req, res) =>{
        const op = req.params.op;
        if(op == "List"){
            const data = await this.db.UserCollection.GetAllUser();
            return this.ObjectResult(res,data);

        }else if(op == "tendangnhap"){

            const {ten_dang_nhap} = req.query;
            const data = await this.db.UserCollection.GetByTendangNhap(ten_dang_nhap);
            return this.ObjectResult(res,data);

        } 
         return this.badrequest(res,"Lỗi kết nối");
    }
    post = async(req,res) =>{
        const op = req.params.op;
        if(op == "create"){
            const data = Object(req.body);
            const model =  user.schema.obj;
            //this.db.UserCollection.Create(data);            
            const keys = Object.keys(model);
            const da = {};
            const convert = Object.keys(data).map((key)=>{
                console.log(keys.find(k => k == key));
                if(typeof keys.find(k => k == key) != undefined){
                    da[key] = data[key];
                }else{
                    const o = Object.keys(da);
                    keys.forEach(element => {
                    
                    });
                };
            });
           // console.log(da);

           
        }
        return res.status(204).json({'Message':"no content result"});
        // console.log(req.query);
        // console.log(req.params)
    }
}
// const getAllUser = async(req, res)=>{ 
//  const data = await user.find({});
// res.status(200).json({data});
// };

// module.exports = {getAllUser};