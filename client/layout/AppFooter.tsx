"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaceBookIcon } from "@/icons";
const AppFooterND: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <footer className="bg-green-700 text-white text-sm px-4 py-6">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Logo và Slogan */}
                <div className="flex items-start space-x-4">
                    <img src="/logo.png" alt="Logo Bach Mai" className="h-16 w-16 object-cover" />
                    <div>
                        <h2 className="font-bold text-base md:text-lg mb-1">
                            CỔNG THÔNG TIN ĐIỆN TỬ BỆNH VIỆN BẠCH MAI
                        </h2>
                        <p className="italic text-white/80">112+ năm vì sức khỏe nhân dân</p>
                    </div>
                </div>

                {/* Thông tin liên hệ */}
                <div className="space-y-1 text-white text-sm leading-relaxed">
                    <p><span className="font-medium">Địa chỉ:</span> 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
                    <p><span className="font-medium">Hotline:</span> 1900.888.866 – 096.985.1616</p>
                    <p><span className="font-medium">Giấy phép số:</span> 115/GP-BC do BVHTT cấp ngày 05/8/2005</p>
                    <p><span className="font-medium">Chịu trách nhiệm chính:</span> PGS.TS. Đào Xuân Cơ – Giám đốc bệnh viện</p>
                </div>
            </div>

            {/* Mạng xã hội & Bản quyền */}
            <div className="mt-6 border-t border-white/30 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
                {/* Mạng xã hội */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="flex items-center space-x-2">
                        <img src="/facebook-icon.png" alt="Facebook" className="h-6 w-6" />
                        <span>Bệnh viện Bạch Mai</span>
                    </a>
                    <span className="text-white/70">105K người theo dõi</span>
                </div>

                <div className="flex space-x-3">
                    <a href="#"><img src="/images/icons/icons8-zalo-48.png" alt="Zalo" className="h-6 w-6" /></a>
                    <a href="#"><img src="/images/icons/icon-youtube-48.png" alt="YouTube" className="h-6 w-6" /></a>
                    <a href="#"><img src="/images/icons/icon-facebook-48.png" alt="YouTube" className="h-6 w-6" /></a>
                </div>
            </div>

            <div className="text-center mt-4 text-white/80 text-xs">
                Copyright © 2023 BACH MAI HOSPITAL
            </div>
        </footer>
    );
};

export default AppFooterND;