import React from "react";
import { TopNav } from "./top-nav";
import { Content } from "./content";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-y-auto">
        <Content>{children}</Content>
      </div>
    </div>
  );
}

export default DashboardLayout;
