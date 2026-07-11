import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Opus Global Solution",
  description:
    "Stay updated with the latest trends, tips, and insights in real estate lead generation, prospecting, and workflow automation.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
