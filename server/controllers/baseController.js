
const DBContext = require('../models/DBContext');
const {RequestState} = require('../Library/Enum');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = class baseController{
    constructor(){
        this.db = new DBContext();
    }
    ObjectResult = function(res, data, Code = RequestState.Success, Message = 'Success', statusCode = 200){
        const response = {
            status: statusCode,
            message: Message, 
            data: data, 
            Code: Code,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };
    badrequest = function(res, Message = 'Error', statusCode = 400){
        const response = {
            status: statusCode, 
            message: Message, 
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(response);
    };
    CreateToken = function(data = {}){
        const maxAge = 3 * 60 * 60;
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(data,jwtSecret,{expiresIn: maxAge * 1000});
        return token;
    };
    //lấy các trường trong schema
    getFields = (schema) => { 
        const fields ={}; 
        schema.eachPath((path) => { 
            if(path !== '_id'){
                fields[path] = null;
            }
            
        }); 
        return fields; 
    };
    Mapfields = (schema, values) =>{
        const fields = this.getFields(schema);
        
        for(const key in fields){
            if(values.hasOwnProperty(key)){
                fields[key] = values[key];
                
            }
        }
       return fields;
    }
}