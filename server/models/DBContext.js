const UserCollection = require('./UserCollection');
const HT_MENUCollection = require('./HT_MENUCollection');
const HT_MENU_ITEMCollection = require('./HT_MENU_ITEMCollection');
const HT_NHOMQUYENCollection = require('./HT_NHOMQUYENCollection');
const HT_DOITUONG_QUYENCollection = require('./HT_DOITUONG_QUYENCollection');
const HT_NGUOIDUNG_SDCollection = require('./HT_NGUOIDUNG_SDCollection');
const HT_CAUHINHCollection = require('./HT_CAUHIINHCollection');
const HT_TEPCollection = require('./HT_TEPCollection');
const HT_TEP_SDCollection = require('./HT_TEP_SDCollection');
module.exports = class DBContext {
  constructor() {
    this.UserCollection = new UserCollection();
    this.HT_MENUCollection = new HT_MENUCollection();
    this.HT_MENU_ITEMCollection = new HT_MENU_ITEMCollection();
    this.HT_NHOMQUYENCollection = new HT_NHOMQUYENCollection();
    this.HT_DOITUONG_QUYENCollection = new HT_DOITUONG_QUYENCollection();
    this.HT_NGUOIDUNG_SDCollection = new HT_NGUOIDUNG_SDCollection();
    this.HT_CAUHINHCollection = new HT_CAUHINHCollection();
    this.HT_TEPCollection = new HT_TEPCollection();
    this.HT_TEP_SDCollection = new HT_TEP_SDCollection();
  }
};