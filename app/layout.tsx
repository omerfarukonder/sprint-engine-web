import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cortex — AI-native sprint memory for engineering teams",
  description:
    "Cortex extracts organizational knowledge from your daily work — chat updates, meetings, PRDs, blockers — and builds a living knowledge graph your whole team can query.",
  openGraph: {
    title: "Cortex",
    description: "Your team's decisions deserve to be remembered.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "#000000", color: "#f0ece4" }}>
        {children}
      </body>
    </html>
  );
}
