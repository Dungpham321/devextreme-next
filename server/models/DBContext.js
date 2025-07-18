const UserCollection = require('./UserCollection');
const HT_MENUCollection = require('./HT_MENUCollection');
const HT_MENU_ITEMCollection = require('./HT_MENU_ITEMCollection');
module.exports = class DBContext {
    constructor() {
      this.UserCollection =new UserCollection();
      this.HT_MENUCollection = new HT_MENUCollection();
      this.HT_MENU_ITEMCollection = new HT_MENU_ITEMCollection();
    }
};