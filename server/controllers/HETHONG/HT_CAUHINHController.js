const HT_MENU = require("../../models/HT_CAUHINH");
const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen } = require('../../Library/Enum');
const { QuyenEnum } = require('../../Library/QuyenEnum');
module.exports = class HT_CAUHINHController extends baseController {
    constructor() {
        const nhomQuyen = NhomQuyen.cauhinh;
        const nhomChucNang = NhomChucNang.QuanTriHeThong;
        super(nhomQuyen, nhomChucNang); // Truyền biến sang BaseController
    }
    static permission() {
        const ctrl = new HT_CAUHINHController();
        return ctrl.quyenCoBan(QuyenEnum.CAUHINH); // hoặc ctrl.quyenCoBan('Xem', 'Sua') nếu muốn cụ thể
    }
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "Access") {
            const MA = req.query.MA;
            const result = await this.db.HT_CAUHINHCollection.GetByMa(MA);
            return this.ObjectResult(res, {
                View: await this.userAccess("cauhinhcauhinhhethongquantrihethong", req),
                Data: JSON.parse(result.GIA_TRI),
                Title: await this.CurentMenu(req)
            });
        }else if(op == "GetTitle"){
            const MA = req.query.MA;
            const result = await this.db.HT_CAUHINHCollection.GetByMa(MA);
            const Data = JSON.parse(result.GIA_TRI);
            return this.ObjectResult(res, Data.ten_he_thong);
        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Save") {
            const data = Object(req.body);
            const MA = data.MA;
            const ITEMS = JSON.stringify(data.items);
            await this.db.HT_CAUHINHCollection.CreateMA(MA,ITEMS);
            return this.ObjectResult(res, null);
        }
        return this.NoContentResult(res);
    }
}