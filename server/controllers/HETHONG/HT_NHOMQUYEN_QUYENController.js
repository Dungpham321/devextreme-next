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
            const data = await this.db.HT_DOITUONG_QUYENCollection.GetByDOITUONG_ID(RID, DsDoiTuong.DM_DANHMUC, DsChucNang.NhomQuyen);
            return this.ObjectResult(res, data);
        } else if (op == "ListQUYEN") {
            const data = await baseController.getSystemPermissionTree();
            const resutl = { items: data };
            return this.ObjectResult(res, resutl);
        } else if(op == "ListNguoiDung"){
            const data = await this.db.UserCollection.GetAllUser();
            return this.ObjectResult(res, data);
        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {
            const data = Object(req.body);
            const RID = data.RID;
            const QUYEN_IDs = data.items;
            const lstDOITUONG = await this.db.HT_DOITUONG_QUYENCollection.GetByDOITUONG_ID(RID, DsDoiTuong.DM_DANHMUC, DsChucNang.NhomQuyen);
            const lstQuyen = await baseController.getSystemPermission().map(q => q.MA);
            const lstInsert = [];
            const lstDelete = [];
            for (const e of QUYEN_IDs) {
                if (!lstQuyen.includes(e)) continue;
                const exists = lstDOITUONG.some(item => item.QUYEN === e);
                if (!exists) {
                    lstInsert.push({
                        DOITUONG_ID: RID,
                        DOITUONG_LOAI: DsDoiTuong.DM_DANHMUC,
                        CHUCNANG: DsChucNang.NhomQuyen.toString(),
                        QUYEN: e
                    });
                }
            }
            // Danh sách quyền cần giữ lại
            const lstQuyenInsert = lstInsert.map(s => s.QUYEN);
            // Danh sách quyền cần xóa khỏi DB
            lstDOITUONG.forEach(item => {
                if (!lstQuyenInsert.includes(item.QUYEN) &&!QUYEN_IDs.includes(item.QUYEN)) {
                    lstDelete.push(item);
                }
            });
            if(lstInsert.length > 0) await this.db.HT_DOITUONG_QUYENCollection.InsertBulk(lstInsert);
            if(lstDelete.length > 0) await this.db.HT_DOITUONG_QUYENCollection.DeleteBulk(lstDelete);
            return this.ObjectResult(res, null);
        } else if (op == "Delete") {
            // const raw = req.body; // hoặc từ query, formData
            // const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            // const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            // for (const id of ids) {
            //     await this.db.HT_NHOMQUYENCollection.Delete(id);
            // }
            // return this.ObjectResult(res, null);
        }
        return this.NoContentResult(res);

    }
    put = async (req, res) => {
        // const id = req.params.id;
        // const data = Object(req.body);
        // data.ngaytao = new Date();
        // await this.db.HT_NHOMQUYENCollection.Update(id, data);
        // return res.status(204).json({ 'Message': "no content result" });
    }
}
