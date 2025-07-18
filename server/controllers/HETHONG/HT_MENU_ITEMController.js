const HT_MENU_ITEM = require("../../models/HT_MENU_ITEM");
const baseController = require("../baseController");
module.exports = class HT_MENU_ITEMController extends baseController {
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const mid = req.query.MID;
            console.log(mid);
            const data = await this.ListAllDK(HT_MENU_ITEM, req, mid,'MID');
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
        } else if (op == "Delete") {
            const raw = req.body; // hoặc từ query, formData
            const parsed = typeof raw === 'string' ? JSON.parse(raw.replace(/'/g, '"')) : raw;
            const ids = JSON.parse(parsed.items); // nếu items là chuỗi JSON  
            for (const id of ids) {
                await this.db.HT_MENUCollection.Delete(id);
            }
            return this.ObjectResult(res, null);
        }
        return res.status(204).json({ 'Message': "no content result" });
    }
    put = async (req, res) => {
        const id = req.params.id;
        const data = Object(req.body);
        data.ngaytao = new Date();
        await this.db.HT_MENUCollection.Update(id, data);
        return res.status(204).json({ 'Message': "no content result" });
    }
}
