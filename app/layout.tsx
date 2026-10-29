import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600"] });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

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
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-[#0a0a0f] font-sans text-[#f8fafc]">{children}</body>
    </html>
  );
}
