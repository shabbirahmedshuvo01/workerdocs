import { HomePage } from "@/components/pages/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorkerDocs — Your work documents. Always ready.",
  description:
    "Keep your employment documents, qualifications and compliance records organized in one secure place — ready whenever your next opportunity comes. Connected with the StaffBeacon ecosystem.",
};

export default function Page() {
  return <HomePage />;
}