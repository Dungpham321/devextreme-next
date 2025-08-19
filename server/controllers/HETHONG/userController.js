const user = require("../../models/user");
const baseController = require("../baseController");
const bcrypt = require('bcrypt');
const { NhomChucNang, NhomQuyen } = require('../../Library/Enum');
const { QuyenEnum } = require('../../Library/QuyenEnum');
module.exports = class userController extends baseController {
    constructor() {
        const nhomQuyen = NhomQuyen.nguoidung;
        const nhomChucNang = NhomChucNang.QuanTriHeThong;
        super(nhomQuyen, nhomChucNang); // Truyền biến sang BaseController
    }
    static permission() {
        const ctrl = new userController();
        return ctrl.quyenCoBan(); // hoặc ctrl.quyenCoBan('Xem', 'Sua') nếu muốn cụ thể
    }
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "Access") {
            return this.ObjectResult(res, {
                View: await this.userAccess("xemnguoidungquantrihethong", req),
                New: await this.userAccess("themnguoidungquantrihethong", req),
                Edit: await this.userAccess("suanguoidungquantrihethong", req),
                Delete: await this.userAccess("xoanguoidungquantrihethong", req),
                Title: await this.CurentMenu(req)
            })
        }
        else if (op == "List") {
            const data = await this.ListAll(user, req);
            return this.ObjectResult(res, data);
        } else if (op == "tendangnhap") {

            const { ten_dang_nhap } = req.query;
            const data = await this.db.UserCollection.GetByTendangNhap(ten_dang_nhap);
            return this.ObjectResult(res, data);

        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {
            const data = Object(req.body);
            const model = user.schema; //model
            const fields = this.Mapfields(model, data);
            fields.mat_khau = await bcrypt.hash(fields.mat_khau, 10);
            fields.ngay_tao = new Date();
            const id = await this.db.UserCollection.Create(fields);
            return this.ObjectResult(res, null);
        } else if (op == "Delete") {
            const raw = req.body; // hoặc từ query, formData
            const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            for (const id of ids) {
                await this.db.UserCollection.Delete(id);
            }
            return this.ObjectResult(res, null);
        }
        return this.NoContentResult(res);
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        await this.db.UserCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
