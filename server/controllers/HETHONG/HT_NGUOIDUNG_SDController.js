const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen, DsDoiTuong, DsChucNang } = require('../../Library/Enum');
const ShortUniqueId = require('short-unique-id');

module.exports = class HT_NGUOIDUNG_SDController extends baseController {

    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const controller = new baseController(null, null, req);
            const userId = controller.NGUOIDUNG_ID;
            const DOITUONG_ID = req.query.DOITUONG_ID;
            const CHUCNANG = req.query.CHUCNANG;
            const DOITUONG_LOAI = req.query.CHUCNANG;
            var lstNGUOIDUNG_SDInfo = [];
            var lstHT_NGUOIDUNG_SD = [];
            if (DOITUONG_ID == "") {
                lstHT_NGUOIDUNG_SD = await this.db.HT_NGUOIDUNG_SDCollection.GetByDOITUONG_ID_ND(DOITUONG_ID, DOITUONG_LOAI, CHUCNANG, userId);
            } else {
                lstHT_NGUOIDUNG_SD = await this.db.HT_NGUOIDUNG_SDCollection.GetByDOITUONG_ID(DOITUONG_ID, DOITUONG_LOAI, CHUCNANG);
            }
            const lstNguoiDung = await this.db.UserCollection.GetAllUser();
            lstNguoiDung.forEach(item => {
                const uid = new ShortUniqueId({ length: 10 });
                const ac = null;
                if(lstHT_NGUOIDUNG_SD.length > 0) ac = lstHT_NGUOIDUNG_SD.find(c => c.NGUOIDUNG_ID === item._id);
                lstNGUOIDUNG_SDInfo.push({
                    _id: ac == null ? uid.rnd() : ac._id,
                    NGUOIDUNG_ID: item._id,
                    DOITUONG_ID: DOITUONG_ID,
                    TEN_DANG_NHAP: item.ten_dang_nhap,
                    CHON: ac != null,
                });
            });
            return this.ObjectResult(res, lstNGUOIDUNG_SDInfo);
        } else if (op == "ListQUYEN") {
            const data = await baseController.getSystemPermissionTree();
            const resutl = { items: data };
            return this.ObjectResult(res, resutl);
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
                if (!lstQuyenInsert.includes(item.QUYEN) && !QUYEN_IDs.includes(item.QUYEN)) {
                    lstDelete.push(item);
                }
            });
            if (lstInsert.length > 0) await this.db.HT_DOITUONG_QUYENCollection.InsertBulk(lstInsert);
            if (lstDelete.length > 0) await this.db.HT_DOITUONG_QUYENCollection.DeleteBulk(lstDelete);
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
        ư

    }
    put = async (req, res) => {
        // const id = req.params.id;
        // const data = Object(req.body);
        // data.ngaytao = new Date();
        // await this.db.HT_NHOMQUYENCollection.Update(id, data);
        // return res.status(204).json({ 'Message': "no content result" });
    }
}
