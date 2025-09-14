import React from 'react';

interface AnimeData {
    title: string;
    description: string;
    image: string;
    url: string;
    genres?: string[];
    releaseDate?: string;
    updatedAt: string;
    rating?: number;
    ratingCount?: number;
    seasons?: number;
    episodes?: number;
    voiceActors?: Array<{ name: string }>;
    director?: string;
}

interface MangaData {
    title: string;
    description: string;
    image: string;
    url: string;
    genres?: string[];
    releaseDate?: string;
    updatedAt: string;
    rating?: number;
    ratingCount?: number;
    chapters?: number;
    author?: string;
    illustrator?: string;
}

interface EpisodeData {
    title: string;
    description: string;
    image: string;
    url: string;
    episodeNumber: number;
    seasonNumber: number;
    releaseDate?: string;
    seriesTitle: string;
    seriesUrl: string;
}

interface ChapterData {
    title: string;
    description: string;
    image: string;
    url: string;
    chapterNumber: number;
    releaseDate?: string;
    mangaTitle: string;
    mangaUrl: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbData {
    items: BreadcrumbItem[];
}

interface WebsiteData {
    name: string;
    description: string;
    url: string;
}

type StructuredDataProps =
    | { type: 'anime'; data: AnimeData }
    | { type: 'manga'; data: MangaData }
    | { type: 'donghua'; data: AnimeData }
    | { type: 'episode'; data: EpisodeData }
    | { type: 'chapter'; data: ChapterData }
    | { type: 'website'; data: WebsiteData }
    | { type: 'breadcrumb'; data: BreadcrumbData };

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    const generateStructuredData = () => {
        switch (type) {
            case 'anime':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'TVSeries',
                    name: data.title,
                    description: data.description,
                    image: data.image,
                    url: data.url,
                    genre: data.genres || [],
                    datePublished: data.releaseDate,
                    dateModified: data.updatedAt,
                    inLanguage: 'id',
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                    },
                    aggregateRating: data.rating ? {
                        '@type': 'AggregateRating',
                        ratingValue: data.rating,
                        ratingCount: data.ratingCount || 1,
                    } : undefined,
                    numberOfSeasons: data.seasons || 1,
                    numberOfEpisodes: data.episodes || 1,
                    actor: data.voiceActors?.map((actor: { name: string }) => ({
                        '@type': 'Person',
                        name: actor.name,
                    })) || [],
                    director: data.director ? {
                        '@type': 'Person',
                        name: data.director,
                    } : undefined,
                };

            case 'manga':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Book',
                    name: data.title,
                    description: data.description,
                    image: data.image,
                    url: data.url,
                    genre: data.genres || [],
                    datePublished: data.releaseDate,
                    dateModified: data.updatedAt,
                    inLanguage: 'id',
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                    },
                    aggregateRating: data.rating ? {
                        '@type': 'AggregateRating',
                        ratingValue: data.rating,
                        ratingCount: data.ratingCount || 1,
                    } : undefined,
                    numberOfPages: data.chapters || 1,
                    author: data.author ? {
                        '@type': 'Person',
                        name: data.author,
                    } : undefined,
                    illustrator: data.illustrator ? {
                        '@type': 'Person',
                        name: data.illustrator,
                    } : undefined,
                };

            case 'donghua':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'TVSeries',
                    name: data.title,
                    description: data.description,
                    image: data.image,
                    url: data.url,
                    genre: data.genres || [],
                    datePublished: data.releaseDate,
                    dateModified: data.updatedAt,
                    inLanguage: 'id',
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                    },
                    aggregateRating: data.rating ? {
                        '@type': 'AggregateRating',
                        ratingValue: data.rating,
                        ratingCount: data.ratingCount || 1,
                    } : undefined,
                    numberOfSeasons: data.seasons || 1,
                    numberOfEpisodes: data.episodes || 1,
                };

            case 'episode':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'TVEpisode',
                    name: data.title,
                    description: data.description,
                    image: data.image,
                    url: data.url,
                    episodeNumber: data.episodeNumber,
                    seasonNumber: data.seasonNumber,
                    datePublished: data.releaseDate,
                    inLanguage: 'id',
                    partOfSeries: {
                        '@type': 'TVSeries',
                        name: data.seriesTitle,
                        url: data.seriesUrl,
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                    },
                };

            case 'chapter':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Chapter',
                    name: data.title,
                    description: data.description,
                    image: data.image,
                    url: data.url,
                    chapterNumber: data.chapterNumber,
                    datePublished: data.releaseDate,
                    inLanguage: 'id',
                    isPartOf: {
                        '@type': 'Book',
                        name: data.mangaTitle,
                        url: data.mangaUrl,
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                    },
                };

            case 'breadcrumb':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: data.items.map((item: BreadcrumbItem, index: number) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.name,
                        item: item.url,
                    })),
                };

            case 'website':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: 'Riznime',
                    description: 'Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!',
                    url: process.env.NEXT_PUBLIC_URL,
                    inLanguage: 'id',
                    publisher: {
                        '@type': 'Organization',
                        name: 'Riznime',
                        url: process.env.NEXT_PUBLIC_URL,
                        logo: {
                            '@type': 'ImageObject',
                            url: `${process.env.NEXT_PUBLIC_URL}/logo.png`,
                        },
                    },
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: {
                            '@type': 'EntryPoint',
                            urlTemplate: `${process.env.NEXT_PUBLIC_URL}/search?q={search_term_string}`,
                        },
                        'query-input': 'required name=search_term_string',
                    },
                    mainEntity: {
                        '@type': 'ItemList',
                        name: 'Sitelinks Riznime',
                        itemListElement: [
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Anime',
                                url: `${process.env.NEXT_PUBLIC_URL}/anime`,
                                description: 'Daftar lengkap anime terbaru dan populer',
                            },
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Anime Ongoing',
                                url: `${process.env.NEXT_PUBLIC_URL}/anime/ongoing`,
                                description: 'Anime yang sedang berlangsung',
                            },
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Anime Completed',
                                url: `${process.env.NEXT_PUBLIC_URL}/anime/completed`,
                                description: 'Anime yang sudah selesai tayang',
                            },
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Manga',
                                url: `${process.env.NEXT_PUBLIC_URL}/manga`,
                                description: 'Koleksi manga terlengkap',
                            },
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Donghua',
                                url: `${process.env.NEXT_PUBLIC_URL}/donghua`,
                                description: 'Donghua China terbaru dan populer',
                            },
                            {
                                '@type': 'SiteNavigationElement',
                                name: 'Genre',
                                url: `${process.env.NEXT_PUBLIC_URL}/anime/genres`,
                                description: 'Jelajahi anime berdasarkan genre',
                            },
                        ],
                    },
                };

            default:
                return {};
        }
    };

    const structuredData = generateStructuredData();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, null, 0),
            }}
        />
    );
};

export default StructuredData;
