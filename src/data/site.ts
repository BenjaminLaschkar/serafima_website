export const site = {
  name: "Serafima Liberman",
  shortName: "Serafima Liberman",
  role: "Soprano",
  tagline: "Soprano — Opéra & Récital",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.serafima-liberman.com",
  locale: "fr-FR",
  languages: ["Russe", "Français", "Anglais", "Italien", "Hébreu"],
  email: "serafimaliberman@gmail.com",
  description:
    "Site officiel de Serafima Liberman, soprano internationale formée au GITIS (Moscou), à l’École Normale de Musique Alfred Cortot (Paris) et à la Jerusalem Academy of Music and Dance.",
  social: {
    instagram: "https://www.instagram.com/serafima_liberman/",
    facebook: "https://www.facebook.com/serafima.liberman",
    youtube: "https://www.youtube.com/@serafimaliberman.",
  },
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Biographie", href: "/bio" },
    { label: "Répertoire", href: "/repertoire" },
    { label: "Médias", href: "/media" },
    { label: "Presse", href: "/press" },
    { label: "Agenda", href: "/schedule" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
