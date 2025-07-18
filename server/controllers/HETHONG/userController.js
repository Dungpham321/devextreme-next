const user = require("../../models/user");
const baseController = require("../baseController");
const bcrypt = require('bcrypt');
module.exports = class userController extends baseController {
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const data = await this.ListAll(user, req);
            // this.db.UserCollection.GetAllUser();
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
        if (op == "create") {
            const data = Object(req.body);
            const model = user.schema; //model
            const fields = this.Mapfields(model, data);
            fields.mat_khau = await bcrypt.hash(fields.mat_khau, 10);
            fields.ngay_tao = new Date();
            const id = await this.db.UserCollection.Create(fields);
        } else if (op == "delete") {
            const Ids = Array(req.body);
            for (const id of Ids) {
                await this.db.UserCollection.Delete(id);
            }
        }
        return res.status(204).json({ 'Message': "no content result" });
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        await this.db.UserCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
