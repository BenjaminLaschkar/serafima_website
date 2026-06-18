import type { Metadata } from "next";
import { MediaContent } from "@/components/MediaContent";

export const metadata: Metadata = {
  title: "Médias",
  description: "Vidéos, galerie photographique et extraits sonores de Serafima Liberman.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return <MediaContent />;
}
