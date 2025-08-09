import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "QueueHub - Unified Queuing Platform",
  description: "Skip the wait, join queues for any service instantly. From CNG pumps to clinics, restaurants to government offices - all in one app.",
  keywords: ["QueueHub", "Queue Management", "Virtual Queue", "CNG Pumps", "Clinics", "Restaurants", "Government Services", "India"],
  authors: [{ name: "QueueHub Team" }],
  openGraph: {
    title: "QueueHub - Unified Queuing Platform",
    description: "Skip the wait, join queues for any service instantly with India's first unified queuing platform.",
    url: "https://queuehub.in",
    siteName: "QueueHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QueueHub - Unified Queuing Platform",
    description: "Skip the wait, join queues for any service instantly with India's first unified queuing platform.",
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
        className="font-sans antialiased bg-background text-foreground"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
