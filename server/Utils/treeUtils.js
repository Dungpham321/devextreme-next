class MenusTree {
  constructor(item, list) {
    // Gán các thuộc tính từ item vào this
    Object.assign(this, item);
    this.subItems = [];
    // Tìm các phần tử con có PID trùng với ID của item
    const children = list.map(item => item._doc).filter( s => s.PID && item._id && s.PID.equals(item._id));
    for (const child of children) {
      const node = new MenusTree(child, list);
      this.subItems.push(node);
    }
  }

  // Hàm static để xây dựng cây từ danh sách phẳng
  static BuildToData(list) {
    const nested = [];
    const roots = list.map(item => item._doc).filter(s => s.PID === 0 || s.PID === null);
    for (const root of roots) {
      if (!root) continue;
      const node = new MenusTree(root, list);
      nested.push(node);
    }

    return nested;
  }
}
module.exports = MenusTree;
