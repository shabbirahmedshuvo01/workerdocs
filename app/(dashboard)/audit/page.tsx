import AuditOverview from "@/components/Audit/AuditOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Trail & Credential Sharing — WorkerDocs",
  description:
    "Review immutable verification logs, manage active contractor permissions, and inspect your digital worker verification passport.",
};

export default function AuditPage() {
  return <AuditOverview />;
}
