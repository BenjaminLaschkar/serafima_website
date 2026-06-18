import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeContent } from "@/components/HomeContent";
import { events as staticEvents } from "@/data/schedule";
import { fetchCalendarEvents } from "@/lib/googleCalendar";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const calendarEvents = await fetchCalendarEvents();
  const events = calendarEvents.length > 0 ? calendarEvents : staticEvents;
  return (
    <>
      <Hero />
      <HomeContent events={events} />
    </>
  );
}