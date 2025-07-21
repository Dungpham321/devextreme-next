const UserCollection = require('./UserCollection');
const HT_MENUCollection = require('./HT_MENUCollection');
const HT_MENU_ITEMCollection = require('./HT_MENU_ITEMCollection');
const HT_NHOMQUYENCollection = require('./HT_NHOMQUYENCollection');
const HT_DOITUONG_QUYENCollection = require('./HT_DOITUONG_QUYENCollection');
module.exports = class DBContext {
  constructor() {
    this.UserCollection = new UserCollection();
    this.HT_MENUCollection = new HT_MENUCollection();
    this.HT_MENU_ITEMCollection = new HT_MENU_ITEMCollection();
    this.HT_NHOMQUYENCollection = new HT_NHOMQUYENCollection();
    this.HT_DOITUONG_QUYENCollection = new HT_DOITUONG_QUYENCollection();
  }
};