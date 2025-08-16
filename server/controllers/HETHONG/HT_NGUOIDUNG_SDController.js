const baseController = require("../baseController");
const { NhomChucNang, NhomQuyen, DsDoiTuong, DsChucNang } = require('../../Library/Enum');
const ShortUniqueId = require('short-unique-id');
const HT_NGUOIDUNG_SD = require("../../models/HT_NGUOIDUNG_SD");

module.exports = class HT_NGUOIDUNG_SDController extends baseController {

    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const userId = this.GetNGUOIDUNG_ID();
            const DOITUONG_ID = req.query.DOITUONG_ID;
            const CHUCNANG = req.query.CHUCNANG;
            const DOITUONG_LOAI = req.query.DOITUONG_LOAI;
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
                let ac = null;
                if (lstHT_NGUOIDUNG_SD.length > 0) ac = lstHT_NGUOIDUNG_SD.find(c => c.NGUOIDUNG_ID.toString() === item._id.toString());
                lstNGUOIDUNG_SDInfo.push({
                    _id: uid.rnd(),
                    ID: ac == null ? 0 : ac._id,
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
            const NGUOIDUNG_ID = data.NGUOIDUNG_ID;
            const DOITUONG_ID = data.DOITUONG_ID;
            const CHUCNANG = data.CHUCNANG;
            const DOITUONG_LOAI = data.DOITUONG_LOAI;
            const dataMain = data.dataMain; //array
            const userId = this.GetNGUOIDUNG_ID(req);
            const lstInsert = [];
            const lstDelete = [];
            const lstHT_NGUOIDUNG_SD = await this.db.HT_NGUOIDUNG_SDCollection.GetByDOITUONG_ID(DOITUONG_ID, DOITUONG_LOAI, CHUCNANG);

            dataMain.forEach((item) => {
                if (item.ID == 0) {
                    if (item.CHON) {
                        lstInsert.push({
                            NGUOIDUNG_ID: item.NGUOIDUNG_ID,
                            DOITUONG_ID: DOITUONG_ID,
                            CHUCNANG: CHUCNANG,
                            DOITUONG_LOAI: DOITUONG_LOAI,
                            ND_ID: userId
                        });
                    }
                } else {
                    const objHT_NGUOIDUNG_SD = lstHT_NGUOIDUNG_SD.find(x => x._id.toString() === item.ID.toString()) || null;
                    if (objHT_NGUOIDUNG_SD == null) return;

                    if (!item.CHON) {
                        lstDelete.push(objHT_NGUOIDUNG_SD);
                    } else {
                        lstInsert.push({
                            NGUOIDUNG_ID: objHT_NGUOIDUNG_SD.NGUOIDUNG_ID,
                            DOITUONG_ID: objHT_NGUOIDUNG_SD.DOITUONG_ID,
                            CHUCNANG: objHT_NGUOIDUNG_SD.CHUCNANG,
                            DOITUONG_LOAI: objHT_NGUOIDUNG_SD.DOITUONG_LOAI,
                            ND_ID: userId
                        });
                    }
                }
            });
            const ids = dataMain.map(s => s.ID);
            const itemsToDelete = lstHT_NGUOIDUNG_SD.filter(c => !ids.includes(c._id));
            lstDelete.push(...itemsToDelete);
            if (lstInsert.length > 0) await this.db.HT_NGUOIDUNG_SDCollection.InsertBulk(lstInsert);
            if (lstDelete.length > 0) await this.db.HT_NGUOIDUNG_SDCollection.DeleteBulk(lstDelete);
            return this.ObjectResult(res, null);
        } else if (op == "Delete") {

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
