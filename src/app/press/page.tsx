import type { Metadata } from "next";
import { PressContent } from "@/components/PressContent";

export const metadata: Metadata = {
  title: "Presse",
  description: "Citations presse, critiques et programmes de Serafima Liberman.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return <PressContent />;
}
