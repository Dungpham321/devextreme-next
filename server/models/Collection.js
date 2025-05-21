const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = class Collection {
   ObjectId = (id) =>{
     return new ObjectId(id);
   }
};