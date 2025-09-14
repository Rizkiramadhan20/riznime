import React from 'react'

import DetailsGenres from "@/hooks/pages/manga/[genresId]/DetailsGenres"

import StructuredData from '@/components/seo/StructuredData';

import { Metadata, ResolvingMetadata } from "next"

import { fetchMangaGenresId } from "@/lib/FetchManga"

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

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page as string) : 1;

    // fetch data
    const mangaData = await fetchMangaGenresId(genreId, page);
    const mangaList = mangaData?.data?.mangaList;

    if (!mangaList || mangaList.length === 0) {
        return {
            title: "Genre Not Found",
            description: "The requested genre could not be found.",
        };
    }

    // Get the first manga's genre title for metadata
    const genreTitle = mangaList[0].genreList.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `Genre ${genreTitle} Manga | Riznime`,
        description: `Jelajahi koleksi lengkap manga genre ${genreTitle} di Riznime. Temukan berbagai judul manga ${genreTitle} terbaru dengan kualitas terbaik dan bahasa Indonesia.`,
        keywords: [
            `Manga ${genreTitle}`,
            `Genre ${genreTitle}`,
            'Manga',
            'Baca Manga',
            'Riznime',
            'Manga Indonesia',
            'Manga Gratis',
            'Manga Terbaru'
        ],
        openGraph: {
            type: 'website',
            title: `Genre ${genreTitle} Manga | Riznime`,
            description: `Jelajahi koleksi lengkap manga genre ${genreTitle} di Riznime. Temukan berbagai judul manga ${genreTitle} terbaru dengan kualitas terbaik dan bahasa Indonesia.`,
            url: `${BASE_URL}/manga/genre/${genreId}`,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(`Genre ${genreTitle} Manga`)}&description=${encodeURIComponent(`Jelajahi koleksi lengkap manga genre ${genreTitle} di Riznime`)}&type=manga`,
                    width: 1200,
                    height: 630,
                    alt: `Genre ${genreTitle} Manga - Riznime`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Genre ${genreTitle} Manga | Riznime`,
            description: `Jelajahi koleksi lengkap manga genre ${genreTitle} di Riznime. Temukan berbagai judul manga ${genreTitle} terbaru dengan kualitas terbaik dan bahasa Indonesia.`,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [
                `${BASE_URL}/api/og?title=${encodeURIComponent(`Genre ${genreTitle} Manga`)}&description=${encodeURIComponent(`Jelajahi koleksi lengkap manga genre ${genreTitle} di Riznime`)}&type=manga`,
            ],
        },
        alternates: {
            canonical: `${BASE_URL}/manga/genre/${genreId}`,
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
    const mangaData = await fetchMangaGenresId(genreId, 1);
    const mangaList = mangaData?.data?.mangaList;
    const genreTitle = mangaList?.[0]?.genreList?.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

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
                        { name: 'Manga', url: `${BASE_URL}/manga` },
                        { name: 'Genre', url: `${BASE_URL}/manga/genre` },
                        { name: genreTitle, url: `${BASE_URL}/manga/genre/${genreId}` },
                    ],
                }}
            />
            <DetailsGenres genreId={genreId} searchParams={resolvedSearchParams} />
        </>
    );
} 