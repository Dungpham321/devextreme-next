class RequestState{
    static Failed = -1;
    static NotAuth = 0;
    static Success = 1;
}
class NhomChucNang{
    static QuanTriHeThong = "Quản trị hệ thống";
    static DanhMuc = "Quản trị danh mục";
}
class NhomQuyen{
    static menu = "menu";
    static menuitem = "Liên kết menu";
}
module.exports = {
    RequestState,
    NhomChucNang,
    NhomQuyen
};