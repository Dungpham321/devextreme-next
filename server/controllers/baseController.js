
const DBContext = require('../models/DBContext');
const { RequestState } = require('../Library/Enum');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = class baseController {
    constructor() {
        this.db = new DBContext();
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
        const query = {};
        if(rawFilter.length){
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
                    items = await model.find(query).sort(sort).skip(skip).limit(take);
                }
            } catch (err) {
                console.warn('Lỗi parse sort:', err.message);
            }
        } else {
            const sortDesc = { 'ngaytao': -1 };
            items = await model.find(query).sort(sortDesc).skip(skip).limit(take);
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
}