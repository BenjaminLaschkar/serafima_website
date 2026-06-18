import type { Event } from "@/data/schedule";

/**
 * Fetches upcoming events from a public Google Calendar.
 *
 * Prerequisites:
 * 1. Share the target Google Calendar as "public" (Calendar Settings > Access permissions)
 * 2. Create a Google Cloud project, enable "Google Calendar API"
 * 3. Create an API key (no OAuth needed for public calendars) restricted to Calendar API
 * 4. Set env vars:
 *    GOOGLE_CALENDAR_API_KEY=AIza...
 *    GOOGLE_CALENDAR_ID=serafimaliberman@gmail.com  (or the calendar ID from settings)
 */

type GCalItem = {
  summary?: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  htmlLink?: string;
  status?: string;
};

function parseLocation(location?: string): { venue: string; city: string; country: string } {
  if (!location) return { venue: "", city: "", country: "" };
  const parts = location.split(",").map((s) => s.trim());
  return {
    venue: parts[0] ?? "",
    city: parts[1] ?? parts[0] ?? "",
    country: parts[parts.length - 1] ?? "",
  };
}

export async function fetchCalendarEvents(): Promise<Event[]> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    return [];
  }

  const now = new Date().toISOString();
  const maxResults = 20;

  try {
    // Fetch upcoming events
    const upcomingUrl = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    upcomingUrl.searchParams.set("key", apiKey);
    upcomingUrl.searchParams.set("timeMin", now);
    upcomingUrl.searchParams.set("maxResults", String(maxResults));
    upcomingUrl.searchParams.set("singleEvents", "true");
    upcomingUrl.searchParams.set("orderBy", "startTime");

    // Fetch past events (last 6 months)
    const pastUrl = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    pastUrl.searchParams.set("key", apiKey);
    pastUrl.searchParams.set("timeMin", sixMonthsAgo.toISOString());
    pastUrl.searchParams.set("timeMax", now);
    pastUrl.searchParams.set("maxResults", "10");
    pastUrl.searchParams.set("singleEvents", "true");
    pastUrl.searchParams.set("orderBy", "startTime");

    const [upcomingRes, pastRes] = await Promise.all([
      fetch(upcomingUrl.toString(), { next: { revalidate: 3600 } }),
      fetch(pastUrl.toString(), { next: { revalidate: 3600 } }),
    ]);

    if (!upcomingRes.ok) {
      console.error("[googleCalendar] API error:", await upcomingRes.text());
      return [];
    }

    const upcomingData = await upcomingRes.json() as { items?: GCalItem[] };
    const pastData = pastRes.ok ? (await pastRes.json() as { items?: GCalItem[] }) : { items: [] };

    const toEvent = (item: GCalItem, status: "À venir" | "Passé"): Event => {
      const startIso = item.start.dateTime ?? `${item.start.date}T20:00:00+02:00`;
      const endIso = item.end?.dateTime ?? item.end?.date;
      const loc = parseLocation(item.location);
      return {
        date: startIso,
        endDate: endIso,
        title: item.summary ?? "Concert",
        programme: item.description,
        venue: loc.venue,
        city: loc.city,
        country: loc.country,
        url: item.htmlLink,
        status,
      };
    };

    const upcoming = (upcomingData.items ?? [])
      .filter((i) => i.status !== "cancelled")
      .map((i) => toEvent(i, "À venir"));

    const past = (pastData.items ?? [])
      .filter((i) => i.status !== "cancelled")
      .map((i) => toEvent(i, "Passé"));

    return [...upcoming, ...past];
  } catch (err) {
    console.error("[googleCalendar] fetch error:", err);
    return [];
  }
}
