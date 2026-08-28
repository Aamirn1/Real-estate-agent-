import { BLOG_POSTS } from "@/app/blog/blog-data";
import { SERVICE_SLUGS } from "@/lib/service-details";

const BASE_URL = "https://opusglobalsolution.com";

/* ============================================================
   Image Sitemap — Google image sitemap extension
   ------------------------------------------------------------
   Approach: B (image extensions within the existing sitemap).
   Chosen over a dedicated image sitemap because all images are
   same-domain (no CDN, no cross-host verification needed) and
   the existing URL sitemap is already well-structured.

   Each <url> entry can contain multiple <image:image> children.
   We reference the CANONICAL original image URLs in /public
   (e.g. /heroes/services-home.jpg), NOT the /_next/image?...
   transformation endpoints that next/image generates at runtime.
   Google's image sitemap spec requires the canonical, publicly
   accessible image URL.

   Only important, search-relevant images are included.
   Decorative backgrounds, UI icons, and favicons are omitted
   per image SEO best practice.
   ============================================================ */

type SitemapImage = {
  loc: string;      // absolute URL to the image file
  title: string;    // descriptive title
  caption: string;  // short description / alt text
};

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: SitemapImage[];
};

/* Page → images map. Only pages with meaningful, search-relevant
   images are included. */
const PAGE_IMAGES: Record<string, SitemapImage[]> = {
  "": [
    {
      loc: `${BASE_URL}/hero-bg-desktop.jpg`,
      title: "Modern luxury home at twilight — Opus Global Solution",
      caption: "Modern two-story house with illuminated windows and landscaped lawn at twilight — homepage hero for Opus Global Solution real estate marketing support.",
    },
    {
      loc: `${BASE_URL}/sections/handshake.jpg`,
      title: "Real estate professional shaking hands with client",
      caption: "Two professionals shaking hands outdoors in front of modern houses — representing Opus Global Solution's client partnerships.",
    },
  ],
  "/services": [
    {
      loc: `${BASE_URL}/heroes/services-home.jpg`,
      title: "Real estate property — Opus Global Solution services",
      caption: "Two-story brick house with white garage door and green lawn under a blue sky — services page hero.",
    },
  ],
  "/virtual-assistance": [
    {
      loc: `${BASE_URL}/heroes/va-home.jpg`,
      title: "Suburban home — virtual assistance for real estate",
      caption: "Two-story suburban house with beige siding, stone accents, and a two-car garage — virtual assistance page hero.",
    },
  ],
  "/pricing": [
    {
      loc: `${BASE_URL}/heroes/pricing-home.jpg`,
      title: "Modern home at dusk — Opus Global Solution pricing",
      caption: "Modern two-story house with illuminated windows and landscaped front yard at dusk — pricing page hero.",
    },
  ],
  "/about": [
    {
      loc: `${BASE_URL}/heroes/about-home.jpg`,
      title: "Modern luxury home with pool — Opus Global Solution",
      caption: "Modern white house with large glass windows, swimming pool, and mountain backdrop at sunset — about page hero.",
    },
  ],
  "/testimonials": [
    {
      loc: `${BASE_URL}/heroes/testimonials-home.jpg`,
      title: "Large modern home — client testimonials",
      caption: "Large modern two-story house with stone and siding exterior, three garage doors, and green lawn — testimonials page hero.",
    },
  ],
};

/* Blog index page — all 8 blog post thumbnail images */
const BLOG_INDEX_IMAGES: SitemapImage[] = BLOG_POSTS.map((post) => ({
  loc: `${BASE_URL}${post.image}`,
  title: post.title,
  caption: post.excerpt,
}));

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/virtual-assistance", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
];

/* XML escape helper — prevents malformed XML from special characters */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildEntries(): SitemapEntry[] {
  const now = new Date().toISOString();
  const entries: SitemapEntry[] = [];

  // Static pages (excluding /blog which gets special treatment below)
  for (const page of STATIC_PAGES) {
    entries.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: now,
      changefreq: page.changeFrequency,
      priority: page.priority,
      images: PAGE_IMAGES[page.path],
    });
  }

  // Blog index — includes all 8 blog post thumbnail images
  entries.push({
    loc: `${BASE_URL}/blog`,
    lastmod: now,
    changefreq: "weekly",
    priority: 0.8,
    images: BLOG_INDEX_IMAGES,
  });

  // Service detail pages — share the services hero image
  for (const slug of SERVICE_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/services/${slug}`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.8,
      images: PAGE_IMAGES["/services"],
    });
  }

  // Blog posts — each includes its own hero image
  for (const post of BLOG_POSTS) {
    entries.push({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString(),
      changefreq: "monthly",
      priority: 0.6,
      images: [
        {
          loc: `${BASE_URL}${post.image}`,
          title: post.title,
          caption: post.excerpt,
        },
      ],
    });
  }

  return entries;
}

function renderImageXml(img: SitemapImage): string {
  return `  <image:image>
    <image:loc>${escapeXml(img.loc)}</image:loc>
    <image:title>${escapeXml(img.title)}</image:title>
    <image:caption>${escapeXml(img.caption)}</image:caption>
  </image:image>`;
}

function renderEntryXml(entry: SitemapEntry): string {
  const images = entry.images?.map(renderImageXml).join("\n") ?? "";
  return `<url>
  <loc>${escapeXml(entry.loc)}</loc>${images ? "\n" + images : ""}
  <lastmod>${entry.lastmod}</lastmod>
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority}</priority>
</url>`;
}

export function GET() {
  const entries = buildEntries();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(renderEntryXml).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
