import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/bio", "/repertoire", "/media", "/press", "/schedule", "/contact"];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === "/schedule" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
