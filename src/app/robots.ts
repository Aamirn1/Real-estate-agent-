import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/get-started", "/agreement", "/signin", "/signup"],
      },
    ],
    sitemap: "https://opusglobalsolution.com/sitemap.xml",
    host: "https://opusglobalsolution.com",
  };
}
