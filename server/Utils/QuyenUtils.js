
function cleanKey(str) {
    return String(str)
        .normalize('NFD')                 // Tách dấu tiếng Việt nếu có
        .replace(/[\u0300-\u036f]/g, '') // Xoá dấu thanh
        .replace(/[^a-z0-9]/gi, '')      // Giữ lại ký tự a-z, 0-9
        .toLowerCase();                  // Chuyển thành chữ thường
}


function getEnumDescription(value) {
    const descriptions = {
        Xem: 'Xem dữ liệu',
        Them: 'Thêm mới',
        Sua: 'Chỉnh sửa',
        Xoa: 'Xóa bỏ',
        // Thêm mô tả cho các quyền khác nếu cần
    };
    return descriptions[value] || value;
}

module.exports = {
    cleanKey,
    getEnumDescription
};