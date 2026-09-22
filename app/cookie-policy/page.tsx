import { Metadata } from "next";
import { CookiePolicyPage } from "@/components/pages/CookiePolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy — WorkerDocs",
  description: "WorkerDocs cookie policy and local storage disclosure.",
};

export default function Page() {
  return <CookiePolicyPage />;
}

