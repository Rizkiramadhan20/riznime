import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";

import "@/base/style/globals.css";

import { ThemeModeScript } from 'flowbite-react';

import { ThemeProvider } from "@/base/theme/ThemeProvider";

import Pathname from "@/base/router/Pathname";

import Providers from "@/base/router/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RizNime",
  description: "Your favorite anime streaming platform",
  manifest: "/manifest.json",
  openGraph: {
    title: "RizNime",
    description: "Your favorite anime streaming platform",
    type: "website",
    locale: "id_ID",
    siteName: "RizNime",
    images: [
      {
        url: "/og-image.jpg", // You should add this image to your public folder
        width: 1200,
        height: 630,
        alt: "RizNime Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RizNime",
    description: "Your favorite anime streaming platform",
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
  metadataBase: new URL("https://riznime.vercel.app"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || savedTheme === 'light') {
                    return savedTheme;
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                const theme = getTheme();
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}>
        <ThemeProvider>
          <Providers>
            <Pathname>
              {children}
            </Pathname>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
