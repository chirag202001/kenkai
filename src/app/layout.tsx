import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingChatButton from "@/components/ChatBot/FloatingChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kenkai Labs - From Problem Discovery to IT Execution",
  description: "We uncover your real tech friction, design a clear roadmap, and build solutions that work. Expert technology consulting for growth-focused teams.",
  keywords: "technology consulting, software development, IT strategy, problem discovery, technical roadmap, software execution",
  authors: [{ name: "Kenkai Labs" }],
  openGraph: {
    title: "Kenkai Labs - Technology Consulting & Software Development",
    description: "Expert technology consulting from problem discovery to execution. Get your tech roadmap and build solutions that work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <FloatingChatButton />
      </body>
    </html>
  );
}
