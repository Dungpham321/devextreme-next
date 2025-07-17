"use client";
import React, { useState, useEffect, useRef } from "react";

const AppHeaderND: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Logo và thông tin bệnh viện */}
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="Bach Mai Hospital" className="h-12" />
                    <div>
                        <h1 className="text-sm md:text-lg font-bold text-green-700">BỆNH VIỆN BẠCH MAI</h1>
                        <p className="text-sm text-gray-700">Bach Mai Hospital</p>
                        <p className="hidden md:block text-sm italic text-gray-500">Vì sức khỏe nhân dân</p>
                    </div>
                    {/* Nút mở menu - chỉ mobile */}
                    <div className="ml-auto flex items-center">
                        <button className="md:hidden p-2 text-white bg-green-700" onClick={() => setOpen(true)}>
                            ☰
                        </button>
                    </div>
                </div>

                {/* Thông tin liên hệ + chức năng */}
                <div className="hidden md:block">
                    <div className="flex flex-col md:flex-row md:justify-end md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-800">
                        <p className="font-medium text-green-700">📞 1900.888.866</p>
                        <a href="#" className="text-green-600 font-medium hover:underline">Đăng nhập</a>
                        <button className="flex items-center space-x-1 border px-2 py-1 rounded hover:bg-gray-100">
                            <img src="/uk-flag.png" alt="English" className="h-4 w-6 object-cover" />
                            <span>English</span>
                        </button>
                    </div>
                    <div className="col-span-full flex justify-end">
                        <p className="text-right md:whitespace-nowrap text-gray-800">
                            78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội
                        </p>
                    </div>
                </div>
            </div>
            <nav className="hidden md:block bg-green-700 text-white text-sm">
                <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">

                    {/* Menu desktop */}
                    <ul className="hidden md:flex space-x-6">
                        <li><a href="#" className="hover:text-gray-200">Cổng thông tin</a></li>
                        <li><a href="#" className="hover:text-gray-200">Chuyên gia</a></li>
                        <li><a href="#" className="hover:text-gray-200">Đặt lịch khám</a></li>
                        <li><a href="#" className="hover:text-gray-200">Tra cứu kết quả</a></li>
                    </ul>
                </div>
            </nav>
            {/* mobile */}
            {/* Menu mobile trượt từ trái */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden`}
            >
                <div className="p-4 space-y-4 text-sm">
                    <button onClick={() => setOpen(false)} className="text-right w-full text-xl">×</button>
                    <a href="#" className="block hover:text-gray-200">Cổng thông tin</a>
                    <a href="#" className="block hover:text-gray-200">Chuyên gia</a>
                    <a href="#" className="block hover:text-gray-200">Đặt lịch khám</a>
                    <a href="#" className="block hover:text-gray-200">Tra cứu kết quả</a>
                </div>
            </div>
        </header>

    );
};

export default AppHeaderND;
