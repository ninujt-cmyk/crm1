import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM",
  description: "Professional CRM",
  keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "HANVA" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/loo.svg",
  },
  openGraph: {
    title: "CRM",
    description: "AI-powered development with modern React stack",
    url: "https://hanva.in",
    siteName: "Hanva CRM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanva CRM",
    description: "Professional CRM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
