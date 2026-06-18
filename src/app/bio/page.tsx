import type { Metadata } from "next";
import { BioContent } from "@/components/BioContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Biographie",
  description: site.description,
  alternates: { canonical: "/bio" },
};

export default function BioPage() {
  return <BioContent />;
}
