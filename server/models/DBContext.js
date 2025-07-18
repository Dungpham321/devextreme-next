const UserCollection = require('./UserCollection');
const HT_MENUCollection = require('./HT_MENUCollection');
module.exports = class DBContext {
    constructor() {
      this.UserCollection =new UserCollection();
      this.HT_MENUCollection = new HT_MENUCollection();
    }
};