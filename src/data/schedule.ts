export type Event = {
  date: string;          // ISO
  endDate?: string;      // ISO
  title: string;
  programme?: string;
  venue: string;
  city: string;
  country: string;
  url?: string;
  status?: "À venir" | "Passé";
};

// — Exemples éditoriaux à remplacer par les vraies dates (CMS-ready)
export const events: Event[] = [
  {
    date: "2026-06-14T20:00:00+02:00",
    title: "Récital — Mélodies françaises",
    programme: "Debussy · Duparc · Fauré",
    venue: "Salle Cortot",
    city: "Paris",
    country: "France",
    status: "À venir",
  },
  {
    date: "2026-09-22T19:30:00+02:00",
    title: "Manon — Massenet",
    programme: "Rôle-titre · production Opéra Fuoco",
    venue: "Athénée Théâtre Louis-Jouvet",
    city: "Paris",
    country: "France",
    status: "À venir",
  },
  {
    date: "2026-11-08T20:00:00+01:00",
    title: "Soirée russe — Rachmaninov · Tchaïkovski",
    programme: "Mélodies op. 38 & extraits d’Onéguine",
    venue: "Lyric Opera Studio",
    city: "Weimar",
    country: "Allemagne",
    status: "À venir",
  },
  {
    date: "2025-12-12T20:00:00+01:00",
    title: "Messiah — Haendel",
    programme: "Soprano solo",
    venue: "Église Saint-Roch",
    city: "Paris",
    country: "France",
    status: "Passé",
  },
];
