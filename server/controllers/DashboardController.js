const baseController = require("./baseController");
const buildTree  = require('../Utils/treeUtils'); // file xử lý cây
module.exports = class DashboardController extends baseController {
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
            const lstQuyen = await this.GetPermission(req);
            const dataMenu = [];
            if (lstQuyen.length > 0) {
                const data = (await this.db.HT_MENU_ITEMCollection.GetByMID(process.env.MENU_ADMIN));
                if (data.length > 0) {
                    data.forEach(e => {
                        const permList = e.PERM?.split(',').map(s => s.trim().split(';')[0]) || [];
                        const found = lstQuyen.find(c => permList.includes(c.QUYEN.toString()));
                        if (e.HREF == "" || e.HREF == "#" || (e.PERM != null && found != null)) {
                            dataMenu.push(e);
                        };
                    });
                }
                const nestedTree = buildTree.BuildToData(dataMenu);
                return this.ObjectResult(res, nestedTree);
            }else{
                return this.ObjectResult(res, dataMenu);
            }


        } else if (op == "tendangnhap") {

        }
        return this.badrequest(res, "Lỗi kết nối");
    }
    post = async (req, res) => {
        const op = req.params.op;
        if (op == "Create") {

        } else if (op == "Delete") {

        }
        return this.NoContentResult(res);
    }

}
