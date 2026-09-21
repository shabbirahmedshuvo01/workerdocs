
import { Metadata } from "next";
import { DesignSystemPage } from "@/components/pages/DesignSystemPage";

export const metadata: Metadata = {
  title: "Design System Showcase — WorkerDocs",
  description:
    "Interactive frontend design foundation and component specification for WorkerDocs.",
};

export default function Page() {
  return <DesignSystemPage />;
}
