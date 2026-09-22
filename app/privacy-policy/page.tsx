import { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/pages/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — WorkerDocs",
  description: "WorkerDocs privacy policy and UK GDPR compliance documentation.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}

