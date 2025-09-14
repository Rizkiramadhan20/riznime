import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const generatePageMetadata = (
    pageTitle: string,
    description: string,
    path: string,
    image?: string
): Metadata => {
    const fullUrl = `${BASE_URL}${path}`;
    const imageUrl = image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}/desktop.jpg`;

    return {
        title: `${pageTitle} - Riznime`,
        description: description,
        keywords: [
            pageTitle,
            'Anime',
            'Manga',
            'Donghua',
            'Riznime',
            'Streaming Indonesia',
            'Nonton Gratis',
            'Subtitle Indonesia',
        ],
        openGraph: {
            type: 'website',
            title: `${pageTitle} - Riznime`,
            description: description,
            url: fullUrl,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${pageTitle} - Riznime`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${pageTitle} - Riznime`,
            description: description,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [imageUrl],
        },
        alternates: {
            canonical: fullUrl,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
};

export const generateAnimePageMetadata = (pageTitle: string, description: string, path: string): Metadata => {
    return generatePageMetadata(pageTitle, description, path);
};

export const generateMangaPageMetadata = (pageTitle: string, description: string, path: string): Metadata => {
    return generatePageMetadata(pageTitle, description, path);
};

export const generateDonghuaPageMetadata = (pageTitle: string, description: string, path: string): Metadata => {
    return generatePageMetadata(pageTitle, description, path);
};

export const generateGenrePageMetadata = (genre: string, type: 'anime' | 'manga' | 'donghua'): Metadata => {
    const pageTitle = `Genre ${genre} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const description = `Jelajahi ${type} dengan genre ${genre}. Temukan ${type} terbaik berdasarkan genre ${genre} di Riznime.`;
    const path = `/${type}/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`;

    return generatePageMetadata(pageTitle, description, path);
};

export const generateSearchPageMetadata = (query: string): Metadata => {
    const pageTitle = `Hasil Pencarian: ${query}`;
    const description = `Hasil pencarian untuk "${query}". Temukan anime, manga, dan donghua yang Anda cari di Riznime.`;
    const path = `/search?q=${encodeURIComponent(query)}`;

    return generatePageMetadata(pageTitle, description, path);
};

export const generateProfilePageMetadata = (pageTitle: string, description: string): Metadata => {
    return generatePageMetadata(pageTitle, description, '/profile');
};

export const generateDashboardPageMetadata = (pageTitle: string, description: string): Metadata => {
    return generatePageMetadata(pageTitle, description, '/dashboard');
};

export default generatePageMetadata;
