
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "Bệnh viện Tai Mũi Họng Trung ương",
  description: "Phần mềm quản lý đặt khám bệnh online",
};

export default function home() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
     
    </div>
  );
}
