const HT_MENU_ITEM = require("../../models/HT_MENU_ITEM");
const buildTree  = require('../../Utils/treeUtils'); // file xử lý cây
const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen } = require('../../Library/Enum');
module.exports = class HT_MENU_ITEMController extends baseController {
     constructor() {
        const nhomQuyen = NhomQuyen.menuitem;
        const nhomChucNang = NhomChucNang.QuanTriHeThong;
        super(nhomQuyen, nhomChucNang); // Truyền biến sang BaseController
    }
    static permission() {
        const ctrl = new HT_MENU_ITEMController();
        return ctrl.quyenCoBan(); // hoặc ctrl.quyenCoBan('Xem', 'Sua') nếu muốn cụ thể
    }
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const mid = req.query.MID;
            const data = await this.ListAllDK(HT_MENU_ITEM, req, mid,'MID');
            // this.db.UserCollection.GetAllUser();
            return this.ObjectResult(res, data);
        }else if(op == "TreeAdmin"){
            const data = await this.db.HT_MENU_ITEMCollection.GetByMID(process.env.MENU_ADMIN);
            const nestedTree = buildTree.BuildToData(data);
            return this.ObjectResult(res, nestedTree);
        }else if(op == "Perm"){
            const data = await baseController.getSystemPermissionTree();
            
             return this.ObjectResult(res, data);
        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {
            const data = Object(req.body);
            const model = HT_MENU_ITEM.schema; //model
            const fields = this.Mapfields(model, data);
            fields.ngaytao = new Date();
            const objMenuItem = await this.db.HT_MENU_ITEMCollection.Create(fields);
        } else if (op == "Delete") {
            const raw = req.body; // hoặc từ query, formData
            const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            for (const id of ids) {
                await this.db.HT_MENU_ITEMCollection.Delete(id);
            }
            return this.ObjectResult(res, null);
        }
        return res.status(204).json({ 'Message': "no content result" });
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        data.ngaytao = new Date();
        await this.db.HT_MENU_ITEMCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
