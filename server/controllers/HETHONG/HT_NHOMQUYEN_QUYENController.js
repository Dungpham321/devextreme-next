const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen, DsDoiTuong, DsChucNang } = require('../../Library/Enum');
module.exports = class HT_NHOMQUYEN_QUYENController extends baseController {
    constructor() {
        const nhomQuyen = NhomQuyen.nhomquyen;
        const nhomChucNang = NhomChucNang.QuanTriHeThong;
        super(nhomQuyen, nhomChucNang); // Truyền biến sang BaseController
    }
   
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const RID = req.query.RID;
            const data =await this.db.HT_DOITUONG_QUYENCollection.GetByDOITUONG_ID(RID, DsDoiTuong.DM_DANHMUC, DsChucNang.NhomQuyen);
            return this.ObjectResult(res, data);
        }else if(op == "ListQUYEN"){
            const data = await baseController.getSystemPermissionTree();
            const resutl = {items:data};
            return this.ObjectResult(res, resutl);
        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {
            // const data = Object(req.body);
            // const model = HT_NHOMQUYEN.schema; //model
            // const fields = this.Mapfields(model, data);
            // fields.ngaytao = new Date();
            // const objNhomQuyen = await this.db.HT_NHOMQUYENCollection.Create(fields);
        } else if (op == "Delete") {
            // const raw = req.body; // hoặc từ query, formData
            // const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            // const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            // for (const id of ids) {
            //     await this.db.HT_NHOMQUYENCollection.Delete(id);
            // }
            // return this.ObjectResult(res, null);
        }
        return res.status(204).json({ 'Message': "no content result" });
    }
    put = async (req, res) => {
        // const id = req.params.id;
        // const data = Object(req.body);
        // data.ngaytao = new Date();
        // await this.db.HT_NHOMQUYENCollection.Update(id, data);
        // return res.status(204).json({ 'Message': "no content result" });
    }
}
