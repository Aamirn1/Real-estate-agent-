/* ============================================================
   BreadcrumbSchema — invisible JSON-LD BreadcrumbList injector
   ------------------------------------------------------------
   Renders no visible UI. Only outputs a <script> tag with
   BreadcrumbList structured data so Google can show breadcrumbs
   in search results.
   ============================================================ */

type Crumb = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
