import { DashboardPage } from "@/components/pages/DashboardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Dashboard — WorkerDocs",
  description: "Worker overview displaying document compliance readiness, required actions, and verified credentials.",
};

export default function Page() {
  return <DashboardPage />;
}

