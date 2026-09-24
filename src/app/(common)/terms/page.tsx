import { TermsPage } from "@/components/pages/TermsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — WorkerDocs",
  description: "WorkerDocs workforce terms of service and usage conditions.",
};

export default function Page() {
  return <TermsPage />;
}

