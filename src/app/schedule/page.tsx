import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { events as staticEvents } from "@/data/schedule";
import { site } from "@/data/site";
import { fetchCalendarEvents } from "@/lib/googleCalendar";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Prochaines représentations, récitals et concerts de Serafima Liberman.",
  alternates: { canonical: "/schedule" },
};

export default async function SchedulePage() {
  // Fetch from Google Calendar; fall back to static data if not configured
  const calendarEvents = await fetchCalendarEvents();
  const events = calendarEvents.length > 0 ? calendarEvents : staticEvents;

  const eventsSchema = {
    "@context": "https://schema.org",
    "@graph": events.map((e) => ({
      "@type": "Event",
      name: e.title,
      startDate: e.date,
      endDate: e.endDate ?? e.date,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: e.venue,
        address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.country },
      },
      performer: { "@type": "Person", name: site.name },
      url: e.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      <section className="pt-32 md:pt-44 pb-16 bg-ink">
        <div className="container-edge">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-4 mb-8">
              <span className="rule" /> Agenda
            </p>
            <h1 className="font-display font-light text-display-lg text-balance max-w-4xl">
              Saison en cours — <em className="italic text-champagne">prochaines dates.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <ScheduleTimeline events={events} />
        </div>
      </section>
    </>
  );
}
