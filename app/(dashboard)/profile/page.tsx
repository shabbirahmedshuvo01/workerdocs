import WorkerProfile from "@/components/Profile/WorkerProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Profile — WorkerDocs",
  description:
    "View and manage worker trade credentials, identity verification, employer records, and site compliance readiness.",
};

export default function ProfilePage() {
  return <WorkerProfile />;
}
