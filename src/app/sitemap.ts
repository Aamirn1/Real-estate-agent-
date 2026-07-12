import { MetadataRoute } from "next";

const BASE_URL = "https://opus-globalsolution.com";

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
];

const BLOG_POSTS = [
  "10-proven-strategies-to-generate-seller-leads-2025",
  "how-virtual-assistants-transforming-real-estate",
  "complete-guide-real-estate-crm-setup-new-agents",
  "why-human-verified-outreach-beats-cold-calling",
  "facebook-google-ads-real-estate-2025-playbook",
  "how-to-build-real-estate-pipeline-never-goes-dry",
  "compliance-real-estate-marketing-tcpa-dnc",
  "from-lead-to-closing-nurture-real-estate-prospects",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogEntries = BLOG_POSTS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
