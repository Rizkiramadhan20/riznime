import React from 'react'

import DetailsGenres from "@/hooks/pages/anime/genres/DetailsGenres"

import StructuredData from '@/components/seo/StructuredData';

import { Metadata, ResolvingMetadata } from "next"

import { fetchAnimeGenresId } from "@/lib/FetchAnime"

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

type Props = {
    params: Promise<{ genreId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Genre {
    title: string;
    genreId: string;
    href: string;
    otakudesuUrl: string;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Disable static generation
export const generateStaticParams = async () => {
    return [];
};

async function getAnimeData(genreId: string, page: number = 1) {
    try {
        const response = await fetchAnimeGenresId(genreId, page);
        return response;
    } catch (error) {
        console.error("Error fetching episode data:", error);
        return null;
    }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page as string) : 1;

    // fetch data
    const animeData = await getAnimeData(genreId, page);
    const animeList = animeData?.data?.animeList;

    if (!animeList || animeList.length === 0) {
        return {
            title: "Genre Not Found",
            description: "The requested genre could not be found.",
        };
    }

    // Get the first anime's genre title for metadata
    const genreTitle = animeList[0].genreList.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `Genre ${genreTitle} Anime | Riznime`,
        description: `Jelajahi koleksi lengkap anime genre ${genreTitle} di Riznime. Temukan berbagai judul anime ${genreTitle} terbaru dengan kualitas terbaik dan subtitle Indonesia.`,
        keywords: [
            `Anime ${genreTitle}`,
            `Genre ${genreTitle}`,
            'Anime',
            'Streaming',
            'Riznime',
            'Subtitle Indonesia',
            'Nonton Gratis',
            'Anime Terbaru'
        ],
        openGraph: {
            type: 'website',
            title: `Genre ${genreTitle} Anime | Riznime`,
            description: `Jelajahi koleksi lengkap anime genre ${genreTitle} di Riznime. Temukan berbagai judul anime ${genreTitle} terbaru dengan kualitas terbaik dan subtitle Indonesia.`,
            url: `${BASE_URL}/anime/genres/${genreId}`,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(`Genre ${genreTitle} Anime`)}&description=${encodeURIComponent(`Jelajahi koleksi lengkap anime genre ${genreTitle} di Riznime`)}&type=anime`,
                    width: 1200,
                    height: 630,
                    alt: `Genre ${genreTitle} Anime - Riznime`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Genre ${genreTitle} Anime | Riznime`,
            description: `Jelajahi koleksi lengkap anime genre ${genreTitle} di Riznime. Temukan berbagai judul anime ${genreTitle} terbaru dengan kualitas terbaik dan subtitle Indonesia.`,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(`Genre ${genreTitle} Anime`)}&description=${encodeURIComponent(`Jelajahi koleksi lengkap anime genre ${genreTitle} di Riznime`)}&type=anime`,
            ],
        },
        alternates: {
            canonical: `${BASE_URL}/anime/genres/${genreId}`,
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
}

export default async function GenrePage({ params, searchParams }: Props) {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    const animeData = await getAnimeData(genreId, 1);
    const animeList = animeData?.data?.animeList;
    const genreTitle = animeList?.[0]?.genreList?.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    return (
        <>
            <StructuredData
                type="website"
                data={{
                    name: 'Riznime',
                    description: 'Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!',
                    url: BASE_URL,
                }}
            />
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Beranda', url: BASE_URL },
                        { name: 'Anime', url: `${BASE_URL}/anime` },
                        { name: 'Genre', url: `${BASE_URL}/anime/genres` },
                        { name: genreTitle, url: `${BASE_URL}/anime/genres/${genreId}` },
                    ],
                }}
            />
            <DetailsGenres genreId={genreId} searchParams={resolvedSearchParams} />
        </>
    );
} 