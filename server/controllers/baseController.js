
const DBContext = require('../models/DBContext');
const { RequestState } = require('../Library/Enum');
const { QuyenEnum } = require('../Library/QuyenEnum');
const { Quyen } = require('../Library/Quyen');
const { cleanKey } = require("../Utils/QuyenUtils")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = class baseController {
    constructor(nhomQuyen, nhomChucNang, req) {
        this.db = new DBContext();
        this.nhomQuyen = nhomQuyen;
        this.nhomChucNang = nhomChucNang;
        this.req = req;
    }
    ObjectResult = function (res, data, Code = RequestState.Success, Message = 'Success', statusCode = 200) {
        const response = {
            status: statusCode,
            message: Message,
            Data: data,
            Code: Code,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };
    badrequest = function (res, Message = 'Error', statusCode = 400) {
        const response = {
            status: statusCode,
            message: Message,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };
    NoContentResult = function (res, Message = "no content result", statusCode = 204) {
        return res.status(statusCode).send();
    }
    CreateToken = function (data = {}) {
        const maxAge = 3 * 60 * 60;
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(data, jwtSecret, { expiresIn: maxAge * 1000 });
        return token;
    };
    //lấy các trường trong schema
    getFields = (schema) => {
        const fields = {};
        schema.eachPath((path) => {
            if (path !== '_id') {
                fields[path] = null;
            }

        });
        return fields;
    };
    Mapfields = (schema, values) => {
        const fields = this.getFields(schema);

        for (const key in fields) {
            if (values.hasOwnProperty(key)) {
                fields[key] = values[key];

            }
        }
        return fields;
    }
    buildMongoQueryFromFilter = (filterArray, schema) => {
        const query = { $or: [] };
        for (const item of filterArray) {
            if (Array.isArray(item)) {
                // Điều kiện đơn
                if (item.length === 3 && typeof item[0] === 'string') {
                    const [field, operator, rawValue] = item;
                    const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
                    const fieldType = schema.path(field)?.instance;

                    if (operator === 'contains' && fieldType === 'String') {
                        query.$or.push({ [field]: { $regex: value, $options: 'i' } });
                    } else if (['>=', '>', '<=', '<'].includes(operator) && fieldType === 'Date') {
                        const dateValue = new Date(value);
                        if (!isNaN(dateValue)) {
                            const mongoOp = { '>=': '$gte', '>': '$gt', '<=': '$lte', '<': '$lt' }[operator];
                            query.$or.push({ [field]: { [mongoOp]: dateValue } });
                        }
                    } else if (operator === 'equals') {
                        query.$or.push({ [field]: value });
                    }
                }

                // Nhóm điều kiện lồng nhau
                else if (item.length >= 3 && item.includes('and')) {
                    const andGroup = [];
                    for (const sub of item) {
                        if (Array.isArray(sub) && sub.length === 3 && typeof sub[0] === 'string') {
                            const [field, operator, rawValue] = sub;
                            const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
                            const fieldType = schema.path(field)?.instance;

                            if (operator === 'contains' && fieldType === 'String') {
                                andGroup.push({ [field]: { $regex: value, $options: 'i' } });
                            } else if (['>=', '>', '<=', '<'].includes(operator) && fieldType === 'Date') {
                                const dateValue = new Date(value);
                                if (!isNaN(dateValue)) {
                                    const mongoOp = { '>=': '$gte', '>': '$gt', '<=': '$lte', '<': '$lt' }[operator];
                                    andGroup.push({ [field]: { [mongoOp]: dateValue } });
                                }
                            } else if (operator === 'equals') {
                                andGroup.push({ [field]: value });
                            }
                        }
                    }
                    query.$or.push({ $and: andGroup });
                }
            }
        }

        return query;
    }
    ListAll = async (model, req) => {
        const skip = parseInt(req.query.skip) || 0;
        const take = parseInt(req.query.take) || 10;
        let sort = req.query.sort;
        const defaultSort = req.query.defaultSort;
        const keys = req.query.keys;
        const fields = req.query.fields;
        const searchValue = req.query.searchValue;
        const jFields = JSON.parse(req.query.fields);
        const rawFilter = req.query.filter ? JSON.parse(req.query.filter) : [];
        let selectFields = "";
        if (Array.isArray(jFields) && jFields.length > 0) {
            selectFields = jFields.join(" ");
        }
        var query = {};
        if (rawFilter.length) {
            query = this.buildMongoQueryFromFilter(rawFilter, model.schema);
        }
        var items;
        if (sort) {
            try {
                const sortParsed = JSON.parse(sort);
                if (Array.isArray(sortParsed) && sortParsed.length > 0) {
                    const firstSort = sortParsed[0];
                    const field = firstSort.selector;
                    const order = firstSort.desc ? -1 : 1;
                    sort = { [field]: order };
                    items = await model.find(query).select(selectFields).sort(sort).skip(skip).limit(take);
                }
            } catch (err) {
                console.warn('Lỗi parse sort:', err.message);
            }
        } else {
            const sortDesc = { 'ngaytao': -1 };
            items = await model.find(query).select(selectFields).sort(sortDesc).skip(skip).limit(take);
        }
        const totalCount = await model.countDocuments(query);
        return { items, totalCount };
    }
    ListAllDK = async (model, req, par, key) => {
        const skip = parseInt(req.query.skip) || 0;
        const take = parseInt(req.query.take) || 10;
        let sort = req.query.sort;
        const params = par
        const rawFilter = req.query.filter ? JSON.parse(req.query.filter) : [];
        let query = {};
        if (!mongoose.Types.ObjectId.isValid(params)) {
            throw new Error('MID không hợp lệ');
        }
        query = { [key]: new mongoose.Types.ObjectId(params) };
        if (rawFilter.length) {
            const queryFilter = this.buildMongoQueryFromFilter(rawFilter, model.schema);
            query = { ...query, ...queryFilter };
        }
        var items;
        if (sort) {
            try {
                const sortParsed = JSON.parse(sort);
                if (Array.isArray(sortParsed) && sortParsed.length > 0) {
                    const firstSort = sortParsed[0];
                    const field = firstSort.selector;
                    const order = firstSort.desc ? -1 : 1;
                    sort = { [field]: order };
                    items = await model.find(query).sort(sort).skip(skip).limit(take);

                }
            } catch (err) {
                console.warn('Lỗi parse sort:', err.message);
            }
        } else {
            items = await model.find(query).skip(skip).limit(take);
        }

        const totalCount = await model.countDocuments(query);
        return { items, totalCount };
    }
    //quyền
    quyenCoBan(...danhSachQuyen) {
        const danhSach = danhSachQuyen.length === 0 ? [QuyenEnum.XEM, QuyenEnum.THEM, QuyenEnum.SUA, QuyenEnum.XOA] : danhSachQuyen;
        return danhSach.map(q => new Quyen(q, this.nhomQuyen, this.nhomChucNang));
    }
    // 💡 Hàm tự động quét toàn bộ quyền hệ thống
    static _lstQUYEN = null;
    static getSystemPermission(db) {
        if (this._lstQUYEN) return this._lstQUYEN;
        const controllersDir = path.join(__dirname);
        const files = this.scanControllerFiles(path.join(__dirname));
        // const files = fs.readdirSync(controllersDir);
        this._lstQUYEN = [];

        for (const file of files) {
            if (!file.endsWith('.js')) continue;
            const controllerPath = file;
            const ctrl = require(controllerPath);

            if (typeof ctrl.permission === 'function') {
                const rawList = ctrl.permission(); // giả sử trả về mảng { quyen, nhomQuyen, chucNang, sapxep }
                // const convertedList = rawList.map(item =>
                //     new Quyen(item.quyen, item.nhomQuyen, item.chucNang, item.sapxep || 0)
                // );
                this._lstQUYEN = this._lstQUYEN.concat(rawList);

            }
        }

        return this._lstQUYEN;
    }
    static getSystemPermissionTree(inQuyen = null) {
        const listPerm = this.getSystemPermission(); // danh sách quyền đầy đủ
        const data = [];
        const listChucNang = [...new Set(listPerm.map(p => p.CHUC_NANG))].sort();
        for (const chucnang of listChucNang) {
            const chucnangKey = cleanKey(chucnang);
            // 📌 Mục CHỨC_NĂNG
            // data.push(new Quyen(chucnangKey, '', '', 0));
            const dataChucNang = { MA: chucnangKey, TEN: chucnang, NHOM_QUYEN: "", CHUC_NANG: "", SAP_XEP: 0 };
            data.push(Quyen.fromObject(dataChucNang, ""));
            const listNhomQuyen = [...new Set(listPerm.filter(p => p.CHUC_NANG === chucnang).map(p => p.NHOM_QUYEN))].sort();
            for (const nhomQuyen of listNhomQuyen) {
                const nhomQuyenKey = cleanKey(nhomQuyen);
                const NoiChuoi = nhomQuyenKey + chucnangKey;
                const dataNhomQuyen = { MA: NoiChuoi, TEN: nhomQuyen, NHOM_QUYEN: "", CHUC_NANG: chucnangKey, SAP_XEP: 0 };
                data.push(Quyen.fromObject(dataNhomQuyen, ""));
                // 📌 Mục NHÓM_QUYỀN
                // data.push(new Quyen(nhomQuyenKey, '', chucnangKey, 0));
                const listQuyen = listPerm.filter(p => p.CHUC_NANG === chucnang && p.NHOM_QUYEN === nhomQuyen).sort((a, b) => a.SAP_XEP - b.SAP_XEP);
                for (const quyen of listQuyen) {
                    if (inQuyen && !inQuyen.includes(quyen.MA)) continue;
                    // 📌 Mục QUYỀN CỤ THỂ cleanKey(nhomQuyen+chucnangKey)
                    const NoiChuoi = cleanKey(nhomQuyen + chucnangKey);
                    //data.push(new Quyen(nhomQuyenKey, '', chucnangKey, 0));
                    data.push(Quyen.fromObject(quyen, NoiChuoi));
                }
            }
        }

        return data;
    }
    static scanControllerFiles(dirPath) {
        let controllerPaths = [];
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                // 🔁 Đệ quy vào thư mục con
                controllerPaths = controllerPaths.concat(this.scanControllerFiles(fullPath));
            } else if (
                entry.isFile() &&
                entry.name.endsWith('.js') &&
                entry.name !== 'BaseController.js'
            ) {
                controllerPaths.push(fullPath);
            }
        }

        return controllerPaths;
    }
    GetNGUOIDUNG_ID() {
        try {
            const authHeader = this.req.headers.authorization;
            const token = authHeader?.split(' ')[1];
            if (!token) return 0;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded._id || 0;
        } catch (err) {
            return 0;
        }
    }
    static GetPermission() {
        const curentUser = this.getCurrentUser();
        const nhomquyen = this.db.HT_NGUOIDUNG_SDCollection.GetByNGUOIDUNG_ID(curentUser._id, "", "HT_NHOMQUYEN").map(s => s.DOITUONG_ID);
        var _lstHT_DOITUONG_QUYEN = this.db.HT_DOITUONG_QUYENCollection.GetByDsDOITUONG_ID(nhomquyen).ToList();
        return _lstHT_DOITUONG_QUYEN;
    }

    getCurrentUser() {
        var currentUser = this.db.UserCollection.GetById(GetNGUOIDUNG_ID());
        return currentUser;
    }

}