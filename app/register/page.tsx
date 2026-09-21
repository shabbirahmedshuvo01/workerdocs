import { Metadata } from "next";
import { RegisterPage } from "@/components/pages/RegisterPage";

export const metadata: Metadata = {
  title: "Create Account — WorkerDocs",
  description: "Create your WorkerDocs profile to organize and share your UK workforce credentials.",
};

export default function Page() {
  return <RegisterPage />;
}

