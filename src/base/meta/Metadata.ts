const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

export const metadata = {
  title: "Riznime - Pusatnya Anime",
  description:
    "Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!",

  authors: [{ name: "Rizki Ramadhan" }],

  keywords: [
    "Anime",
    "Riznime",
    "Anime Terbaru",
    "Anime Populer",
    "Anime Lengkap",
    "Anime Streaming",
    "Manga",
    "Donghua",
    "Streaming Anime Indonesia",
    "Anime Subtitle Indonesia",
    "Nonton Anime Gratis",
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
      name: "Riznime",
      content: "Streaming Anime, Manga, Donghua Indonesia",
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
    title: "Riznime - Pusatnya Anime",
    description:
      "Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!",
    url: BASE_URL,
    siteName: "Riznime",
    locale: "id_ID",
    images: [
      {
        url: "/desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Riznime - Pusatnya Anime",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Riznime - Pusatnya Anime",
    description:
      "Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/desktop.jpg"],
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
