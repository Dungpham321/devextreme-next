"use client";
import { useSidebar } from "@/context/SidebarContext";
import AppHeaderND from "@/layout/AppHeaderND";
import AppFooterND from "@/layout/AppFooter";
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
  return (
    <div className="min-h-screen">

        <AppHeaderND />
        {/* Page Content */}
        <div className="min-h-screen flex flex-col">{children}</div>
        <AppFooterND/>
    </div>
  );
}
