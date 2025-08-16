const HT_MENU = require("../../models/HT_MENU");
const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen } = require('../../Library/Enum');
module.exports = class HT_MENUController extends baseController {
    constructor() {
        const nhomQuyen = NhomQuyen.menu;
        const nhomChucNang = NhomChucNang.QuanTriHeThong;
        super(nhomQuyen, nhomChucNang); // Truyền biến sang BaseController
    }
    static permission() {
        const ctrl = new HT_MENUController();
        return ctrl.quyenCoBan(); // hoặc ctrl.quyenCoBan('Xem', 'Sua') nếu muốn cụ thể
    }

    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const data = await this.ListAll(HT_MENU, req);
            // this.db.UserCollection.GetAllUser();
            return this.ObjectResult(res, data);
        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {
            const data = Object(req.body);
            const model = HT_MENU.schema; //model
            const fields = this.Mapfields(model, data);
            fields.ngaytao = new Date();
            const objMenu = await this.db.HT_MENUCollection.Create(fields);
             return this.ObjectResult(res, null);
        } else if (op == "Delete") {
            const raw = req.body; // hoặc từ query, formData
            const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            for (const id of ids) {
                await this.db.HT_MENUCollection.Delete(id);
            }
            return this.ObjectResult(res, null);
        }
        return this.NoContentResult(res);
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        data.ngaytao = new Date();
        await this.db.HT_MENUCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
