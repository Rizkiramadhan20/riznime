const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

export const metadata = {
  title: "RizNime - Pusatnya Anime",
  description:
    "Tonton anime terbaru dan terlengkap dengan subtitle Indonesia. Nikmati ribuan judul anime berkualitas tinggi dengan streaming gratis!",

  authors: [{ name: "Rizki Ramadhan" }],

  keywords: [
    "Anime",
    "RizNime",
    "Anime Terbaru",
    "Anime Terpopuler",
    "Anime Terlengkap",
    "Anime Terbaik",
    "Streaming Anime",
    "Anime Subtitle Indonesia",
  ],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
  },

  tags: [
    {
      name: "RizNime",
      content: "Streaming Anime",
    },
  ],

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
  },

  openGraph: {
    type: "website",
    title: "RizNime - Pusatnya Anime",
    description:
      "Tonton anime terbaru dan terlengkap dengan subtitle Indonesia. Nikmati ribuan judul anime berkualitas tinggi dengan streaming gratis!",
    url: BASE_URL,
    siteName: "RizNime",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RizNime - Pusatnya Anime",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RizNime - Pusatnya Anime",
    description:
      "Tonton anime terbaru dan terlengkap dengan subtitle Indonesia. Nikmati ribuan judul anime berkualitas tinggi dengan streaming gratis!",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/og-image.jpg"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
    },
  },
};

export default metadata;
