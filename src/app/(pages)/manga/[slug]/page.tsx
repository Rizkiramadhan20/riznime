import React from 'react'

import { Metadata, ResolvingMetadata } from "next"

import DetailsManga from "@/hooks/pages/manga/details-manga/DetailsManga"

import StructuredData from '@/components/seo/StructuredData';

import { fetchMangaBySlug } from "@/lib/FetchManga"

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

type Props = {
    params: Promise<{ slug: string }>
}

async function getMangaData(slug: string) {
    try {
        const response = await fetchMangaBySlug(slug);
        return response;
    } catch (error) {
        console.error("Error fetching manga data:", error);
        return null;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    // fetch data
    const mangaData = await getMangaData(slug);
    const manga = mangaData?.data;

    if (!manga) {
        return {
            title: "Manga Not Found",
            description: "The requested manga could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${manga.title || 'Manga'} | Riznime`,
        description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
        keywords: [
            manga.title || 'Manga',
            manga.indonesianTitle || '',
            'Manga',
            'Baca Manga',
            'Riznime',
            'Manga Indonesia',
            'Manga Gratis'
        ],
        openGraph: {
            type: 'website',
            title: `${manga.title || 'Manga'} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
            url: `${BASE_URL}/manga/${slug}`,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: manga.poster,
                    width: 1200,
                    height: 630,
                    alt: `${manga.title || 'Manga'} - Riznime`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${manga.title || 'Manga'} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [manga.poster],
        },
        alternates: {
            canonical: `${BASE_URL}/manga/${slug}`,
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

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const mangaData = await getMangaData(slug);
    const manga = mangaData?.data;

    return (
        <>
            {manga && (
                <StructuredData
                    type="manga"
                    data={{
                        title: manga.title || 'Manga',
                        description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
                        image: manga.poster,
                        url: `${BASE_URL}/manga/${slug}`,
                        genres: manga.genreList?.map((genre: { title: string }) => genre.title) || [],
                        releaseDate: manga.releaseDate,
                        updatedAt: manga.updatedAt || new Date().toISOString(),
                        rating: manga.rating,
                        ratingCount: manga.ratingCount,
                        chapters: manga.chapterCount,
                        author: manga.author,
                        illustrator: manga.illustrator,
                    }}
                />
            )}
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Beranda', url: BASE_URL },
                        { name: 'Manga', url: `${BASE_URL}/manga` },
                        { name: manga?.title || 'Manga', url: `${BASE_URL}/manga/${slug}` },
                    ],
                }}
            />
            <DetailsManga params={{ slug }} />
        </>
    )
} 