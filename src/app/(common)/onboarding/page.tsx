import { OnboardingPage } from "@/components/pages/OnboardingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Onboarding — WorkerDocs",
  description: "Complete your WorkerDocs profile setup and professional trade qualifications.",
};

export default function Page() {
  return <OnboardingPage />;
}

