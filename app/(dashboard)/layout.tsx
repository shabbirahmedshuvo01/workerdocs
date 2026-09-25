import DashboardShell from "@/components/shared/dashboard-part/DashboardShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}