import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Craft — AI Branding Studio",
  description:
    "AI-powered branding studio for logos, posters, social media graphics, and more.",
  keywords: [
    "AI branding",
    "logo maker",
    "poster maker",
    "social media graphics",
    "brand identity",
    "AI design",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🎨</text></svg>",
  },
  openGraph: {
    title: "Craft — AI Branding Studio",
    description: "Craft your brand. Not your bill.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craft — AI Branding Studio",
    description: "Craft your brand. Not your bill.",
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
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
