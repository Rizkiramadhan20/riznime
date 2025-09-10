import { Poppins } from "next/font/google";

import "@/base/style/globals.css";

import { ThemeModeScript } from 'flowbite-react';

import { ThemeProvider } from "@/base/theme/ThemeProvider";

import Pathname from "@/base/router/Pathname";

import Providers from "@/base/router/Provider";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import { metadata } from "@/base/meta/Metadata";

export { metadata };

metadata.manifest = "/manifest.json";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL as string;
  const searchUrl = `${BASE_URL}/search?q={search_term_string}`;
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: searchUrl,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <GoogleTagManager />
        <script
          async
          src={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={poppins.variable}>
        <GoogleTagManagerNoScript />
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
