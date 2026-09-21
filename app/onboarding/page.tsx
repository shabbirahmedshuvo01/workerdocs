import { Metadata } from "next";
import { OnboardingPage } from "@/components/pages/OnboardingPage";

export const metadata: Metadata = {
  title: "Worker Onboarding — WorkerDocs",
  description: "Complete your WorkerDocs profile setup and Right to Work compliance declaration.",
};

export default function Page() {
  return <OnboardingPage />;
}

