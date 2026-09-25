import DocumentsOverview from "@/components/Dashboard/DocumentsOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents Vault — WorkerDocs",
  description:
    "Manage, verify, and export your digital compliance credentials, trade cards, and qualification certificates.",
};

export default function DocumentsPage() {
  return <DocumentsOverview />;
}
