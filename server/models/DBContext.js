const UserCollection = require('./UserCollection');
module.exports = class DBContext {
    constructor() {
      this.UserCollection =new UserCollection();
    }
};