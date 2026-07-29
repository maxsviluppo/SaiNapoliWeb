import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/chisiamo", priority: 0.9, changeFrequency: "monthly" },
    { path: "/haccp", priority: 0.9, changeFrequency: "monthly" },
    { path: "/sicurezza-sul-lavoro", priority: 0.9, changeFrequency: "monthly" },
    { path: "/legionella", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gasradon", priority: 0.8, changeFrequency: "monthly" },
    { path: "/analisi-acque", priority: 0.8, changeFrequency: "monthly" },
    { path: "/formazione", priority: 0.8, changeFrequency: "monthly" },
    { path: "/studiodontoiatrici", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gdpr", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
