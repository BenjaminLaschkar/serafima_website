import type { Metadata } from "next";
import { RepertoireContent } from "@/components/RepertoireContent";

export const metadata: Metadata = {
  title: "Répertoire",
  description: "Rôles, oratorios, mélodie, lied et récitals — répertoire lyrique de Serafima Liberman.",
  alternates: { canonical: "/repertoire" },
};

export default function RepertoirePage() {
  return <RepertoireContent />;
}
