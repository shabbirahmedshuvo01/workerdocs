import { PrivacyPolicyPage } from "@/components/pages/PrivacyPolicyPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — WorkerDocs",
  description: "WorkerDocs privacy policy and UK GDPR compliance documentation.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}

