const HT_MENU = require("../../models/HT_MENU");
const baseController = require("../baseController");
module.exports = class userController extends baseController {
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
            const objMenu =  await this.db.HT_MENUCollection.Create(fields);
        } else if (op == "delete") {
            const Ids = Array(req.body);
            for (const id of Ids) {
                //await this.db.UserCollection.Delete(id);
            }
        }
        return res.status(204).json({ 'Message': "no content result" });
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        //await this.db.UserCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
