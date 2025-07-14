"use client";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import  AppSidebar  from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, {useEffect, useState} from "react";
import {GetCookie} from "@/components/auth/cookies";
import { useRouter } from 'next/navigation';
export default function AdminLayout({children,}: {children: React.ReactNode;}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isToken, settoken] = useState<string | null>(null);
  const router = useRouter();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen? "ml-0": isExpanded || isHovered? "lg:ml-[290px]": "lg:ml-[90px]";
  useEffect(() => {
    const token = GetCookie();
    settoken(token);
    if(token != null){
        router.push('/');
    }else{
        router.push('/login');
    }
  }, []);
  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
