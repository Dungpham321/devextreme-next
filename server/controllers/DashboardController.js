const baseController = require("./baseController");
module.exports = class DashboardController extends baseController {
     constructor(req) {
        super(req); // Truyền biến sang BaseController
    }
    get = async (req, res) => {
        const op = req.params.op;
        if (op == "List") {
           
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
