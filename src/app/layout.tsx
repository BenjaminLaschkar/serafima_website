import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSerif, fontSans } from "@/lib/fonts";
import { site } from "@/data/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CurtainIntro } from "@/components/CurtainIntro";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [
      { url: "/media/serafima-liberman-7.jpg", width: 1600, height: 900, alt: site.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/media/serafima-liberman-7.jpg"],
  },
  icons: {
    icon: [
      { url: "/media/Design-sans-titre-3.png" },
      { url: "/media/cropped-opera_icon512x512.png", sizes: "512x512" },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Opera Singer · Soprano",
  description: site.description,
  knowsLanguage: site.languages,
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  image: `${site.url}/media/serafima-liberman-7.jpg`,
  alumniOf: [
    { "@type": "EducationalOrganization", name: "GITIS — Russian Institute of Theater Arts" },
    { "@type": "EducationalOrganization", name: "École Normale de Musique Alfred Cortot, Paris" },
    { "@type": "EducationalOrganization", name: "Jerusalem Academy of Music and Dance" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable}`}
    >
      <body className="bg-ink text-ivory min-h-screen grain">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LangProvider>
          <CurtainIntro />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-champagne focus:text-ink focus:px-4 focus:py-2"
          >
            Aller au contenu
          </a>
          <Nav />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
