import { LoginPage } from "@/components/pages/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — WorkerDocs",
  description: "Access your verified worker profile and compliance documents.",
};

export default function Page() {
  return <LoginPage />;
}

