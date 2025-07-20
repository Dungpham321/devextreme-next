const { cleanKey, getEnumDescription } = require('../Utils/QuyenUtils');

class Quyen {
  constructor(quyen, nhomQuyen, chucNang, sapxep = 0, data = {}) {
    this.MA = data.MA ?? cleanKey(`${quyen}${nhomQuyen}${chucNang}`);
    this.TEN = data.TEN ?? getEnumDescription(quyen);
    this.NHOM_QUYEN = data.NHOM_QUYEN ?? nhomQuyen;
    this.CHUC_NANG = data.CHUC_NANG ?? getEnumDescription(chucNang);
    this.SAP_XEP = sapxep;
  }
  // 💡 Hàm tạo nhanh từ dữ liệu có sẵn
  static fromObject({ MA, TEN, NHOM_QUYEN, CHUC_NANG, SAP_XEP = 0 }) {
    const q = new Quyen('', '', '', SAP_XEP);
    q.MA = MA;
    q.TEN = TEN;
    q.NHOM_QUYEN = NHOM_QUYEN;
    q.CHUC_NANG = CHUC_NANG;
    return q;
  }

}

module.exports = { Quyen };
