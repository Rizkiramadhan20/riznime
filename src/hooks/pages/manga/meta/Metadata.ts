import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
  title: "Manga - Riznime",
  description:
    "Baca manga terbaru, ongoing, dan completed dengan terjemahan Indonesia di Riznime. Update harian, genre lengkap, dan koleksi manhwa & manhua.",
  alternates: {
    canonical: `${BASE_URL}/manga`,
    languages: {
      "id-ID": `${BASE_URL}/manga`,
    },
  },
  openGraph: {
    type: "website",
    title: "Manga - Riznime",
    description:
      "Baca manga terbaru, ongoing, dan completed dengan terjemahan Indonesia di Riznime.",
    url: `${BASE_URL}/manga`,
    siteName: "Riznime",
    locale: "id_ID",
    images: [
      {
        url: "/desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Manga - Riznime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manga - Riznime",
    description:
      "Baca manga terbaru, ongoing, dan completed dengan terjemahan Indonesia di Riznime.",
    images: ["/desktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "manga",
    "manga indonesia",
    "baca manga",
    "manhwa",
    "manhua",
    "manga ongoing",
    "manga completed",
    "manga terbaru",
  ],
};

export default metadata;
