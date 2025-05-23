"use client";
import Image from "next/image";
import Grid_custom from "@/components/Grid_custom";
import type { LocateInMenuMode, ShowTextMode } from "devextreme/ui/toolbar";
import type { ToolbarItemLocation, ToolbarItemComponent } from "devextreme/common";
import { text } from "stream/consumers";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";


export default function Home() {
  const isAuthenticated: boolean = false;
  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login"); // Chuyển hướng nếu chưa đăng nhập
    }else{
      redirect("/dashboard");
    }
  }, []);
  return (
    <></>
  );
}
