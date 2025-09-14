import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const generateAnimeMetadata = (title: string, description: string, image?: string): Metadata => {
    return {
        title: `${title} - Riznime`,
        description: description,
        keywords: [
            title,
            "Anime",
            "Riznime",
            "Anime Terbaru",
            "Anime Populer",
            "Streaming Anime Indonesia",
            "Anime Subtitle Indonesia",
            "Nonton Anime Gratis",
        ],
        openGraph: {
            type: "website",
            title: `${title} - Riznime`,
            description: description,
            url: BASE_URL,
            siteName: "Riznime",
            locale: "id_ID",
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=anime`,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime`,
                },
                {
                    url: image || "/desktop.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Riznime`,
            description: description,
            creator: "@rizki_ramadhan",
            site: "@rizki_ramadhan",
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=anime`,
                image || "/desktop.jpg"
            ],
        },
        alternates: {
            canonical: BASE_URL,
        },
    };
};

export const generateMangaMetadata = (title: string, description: string, image?: string): Metadata => {
    return {
        title: `${title} - Riznime Manga`,
        description: description,
        keywords: [
            title,
            "Manga",
            "Riznime",
            "Manga Terbaru",
            "Manga Populer",
            "Baca Manga Indonesia",
            "Manga Gratis",
            "Komik Online",
        ],
        openGraph: {
            type: "website",
            title: `${title} - Riznime Manga`,
            description: description,
            url: BASE_URL,
            siteName: "Riznime",
            locale: "id_ID",
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=manga`,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime Manga`,
                },
                {
                    url: image || "/desktop.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime Manga`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Riznime Manga`,
            description: description,
            creator: "@rizki_ramadhan",
            site: "@rizki_ramadhan",
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=manga`,
                image || "/desktop.jpg"
            ],
        },
        alternates: {
            canonical: BASE_URL,
        },
    };
};

export const generateDonghuaMetadata = (title: string, description: string, image?: string): Metadata => {
    return {
        title: `${title} - Riznime Donghua`,
        description: description,
        keywords: [
            title,
            "Donghua",
            "Riznime",
            "Donghua Terbaru",
            "Donghua Populer",
            "Streaming Donghua Indonesia",
            "Donghua Subtitle Indonesia",
            "Nonton Donghua Gratis",
        ],
        openGraph: {
            type: "website",
            title: `${title} - Riznime Donghua`,
            description: description,
            url: BASE_URL,
            siteName: "Riznime",
            locale: "id_ID",
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=donghua`,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime Donghua`,
                },
                {
                    url: image || "/desktop.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime Donghua`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Riznime Donghua`,
            description: description,
            creator: "@rizki_ramadhan",
            site: "@rizki_ramadhan",
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=donghua`,
                image || "/desktop.jpg"
            ],
        },
        alternates: {
            canonical: BASE_URL,
        },
    };
};

export const generatePageMetadata = (pageTitle: string, description: string, path: string): Metadata => {
    const fullUrl = `${BASE_URL}${path}`;

    return {
        title: `${pageTitle} - Riznime`,
        description: description,
        keywords: [
            pageTitle,
            "Anime",
            "Manga",
            "Donghua",
            "Riznime",
            "Streaming Indonesia",
            "Nonton Gratis",
        ],
        openGraph: {
            type: "website",
            title: `${pageTitle} - Riznime`,
            description: description,
            url: fullUrl,
            siteName: "Riznime",
            locale: "id_ID",
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(description)}&type=page`,
                    width: 1200,
                    height: 630,
                    alt: `${pageTitle} - Riznime`,
                },
                {
                    url: "/desktop.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${pageTitle} - Riznime`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${pageTitle} - Riznime`,
            description: description,
            creator: "@rizki_ramadhan",
            site: "@rizki_ramadhan",
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(pageTitle)}&description=${encodeURIComponent(description)}&type=page`,
                "/desktop.jpg"
            ],
        },
        alternates: {
            canonical: fullUrl,
        },
    };
};

export default generateAnimeMetadata;
