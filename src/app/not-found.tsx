import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center bg-ink">
      <div className="container-edge text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-display font-light text-display-lg">
          Cette <em className="italic text-champagne">scène</em> n’existe pas.
        </h1>
        <Link href="/" className="mt-12 inline-flex btn-ghost">
          Retour à l’accueil <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
