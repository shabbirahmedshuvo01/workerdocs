import DashboardLayout from "@/components/pages/dashboardLayout/layout";
import React from "react";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
