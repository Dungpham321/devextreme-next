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
    static nguoidung = "Người dùng";
    static nhomquyen = "Nhóm quyền";
}
class DsDoiTuong{
    static DM_DANHMUC = "DM_DANHMUC";
}
class DsChucNang{
    static NhomQuyen = 'HT_NHOMQUYEN'
}
module.exports = {
    RequestState,
    NhomChucNang,
    NhomQuyen,
    DsDoiTuong,
    DsChucNang
};