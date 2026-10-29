import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ganesh-portfolio-indol.vercel.app"),
  title: "Ganesh — Portfolio",
  description:
    "Ganesh — B.Tech Computer Science, IIIT Guwahati (2023–2027). Full-stack and AI-integrated applications, agentic AI. Seeking SDE / AI Engineer internships.",
  keywords: ["Ganesh", "IIIT Guwahati", "full-stack", "agentic AI", "RAG", "LangGraph", "SDE intern"],
  authors: [{ name: "Ganesh" }],
  openGraph: {
    title: "Ganesh — Portfolio",
    description:
      "B.Tech Computer Science, IIIT Guwahati (2023–2027). Full-stack and AI-integrated applications, agentic AI.",
    type: "website",
    images: [{ url: "/photo.jpg", alt: "Portrait of Ganesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh — Portfolio",
    description:
      "B.Tech Computer Science, IIIT Guwahati (2023–2027). Full-stack and AI-integrated applications, agentic AI.",
    images: ["/photo.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="font-sans bg-page text-ink">{children}</body>
    </html>
  );
}
