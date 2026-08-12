import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Marketing Blog | Tips & Strategies | Opus Global Solution",
  description:
    "Stay updated with the latest trends, tips, and insights in real estate lead generation, prospecting, and workflow automation.",
  alternates: { canonical: "https://opusglobalsolution.com/blog" },
  openGraph: {
    title: "Real Estate Marketing Blog | Tips & Strategies | Opus Global Solution",
    description:
      "Stay updated with the latest trends, tips, and insights in real estate lead generation, prospecting, and workflow automation.",
    images: [
      {
        url: "https://opusglobalsolution.com/heroes/blog-home.jpg",
        width: 1344,
        height: 768,
        alt: "Two-story house with wood shingle siding, covered front porch, and landscaped flower beds",
        type: "image/jpeg",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
