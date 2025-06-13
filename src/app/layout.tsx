import { Poppins } from "next/font/google";

import "@/base/style/globals.css";

import { ThemeModeScript } from 'flowbite-react';

import { ThemeProvider } from "@/base/theme/ThemeProvider";

import Pathname from "@/base/router/Pathname";

import Providers from "@/base/router/Provider";

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
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={poppins.variable}>
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
