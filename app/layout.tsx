import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Syncopate } from "next/font/google";
import "./globals.css";

// Fonts from the uploaded specification: Inter for body, Playfair Display
// for the hero title, Syncopate for large display text, JetBrains Mono
// for indices, badges and metadata.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "800"],
});
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["800"] });
const display = Syncopate({ subsets: ["latin"], variable: "--font-display", weight: ["400", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "800"] });

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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-[#030303] font-sans text-[#e0e0e0]">{children}</body>
    </html>
  );
}
