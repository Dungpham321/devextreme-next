"use client";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";
import { GetCookie } from "@/components/auth/cookies";
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/devextreme/Toast_custom';
import viMessages from 'devextreme/localization/messages/vi.json';
import { loadMessages, locale } from 'devextreme/localization';

export default function AdminLayout({ children, }: { children: React.ReactNode; }) {
  loadMessages(viMessages);
  locale('vi');
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isToken, settoken] = useState<string | null>(null);
  const router = useRouter();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const tokenValue = GetCookie();
    settoken(tokenValue);
    if (!tokenValue) {
      const toastMsg = encodeURIComponent('Vui lòng đăng nhập để sử dụng');
      const type = 'error';
      router.push(`/login?toast=${toastMsg}&type=${type}`);
    }
  }, []);
  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}>
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto md:p-6">{children}</div>
      </div>
    </div>
  );
}
