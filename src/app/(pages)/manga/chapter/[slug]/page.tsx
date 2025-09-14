import React from 'react'

import DetailsChapter from "@/hooks/pages/manga/chapter/DetailsChapter"

import StructuredData from '@/components/seo/StructuredData';

import { Metadata, ResolvingMetadata } from "next"

import { fetchMangaByChapter } from "@/lib/FetchManga"

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

type Props = {
    params: Promise<{ slug: string }>
}

async function getMangaData(slug: string) {
    try {
        const response = await fetchMangaByChapter(slug);
        return response;
    } catch (error) {
        console.error("Error fetching chapter data:", error);
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
            title: "chapter Not Found",
            description: "The requested chapter could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${manga.title} | Riznime`,
        description: manga.synopsis?.paragraphs?.[0] || `Read ${manga.title} online.`,
        keywords: [
            manga.title,
            'Manga',
            'Chapter',
            'Baca Manga',
            'Riznime',
            'Manga Indonesia',
            'Manga Gratis'
        ],
        openGraph: {
            type: 'website',
            title: `${manga.title} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Read ${manga.title} online.`,
            url: `${BASE_URL}/manga/chapter/${slug}`,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: manga.poster,
                    width: 1200,
                    height: 630,
                    alt: `${manga.title} - Riznime`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${manga.title} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Read ${manga.title} online.`,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [manga.poster],
        },
        alternates: {
            canonical: `${BASE_URL}/manga/chapter/${slug}`,
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
                    type="chapter"
                    data={{
                        title: manga.title,
                        description: manga.synopsis?.paragraphs?.[0] || `Read ${manga.title} online.`,
                        image: manga.poster,
                        url: `${BASE_URL}/manga/chapter/${slug}`,
                        chapterNumber: manga.chapterNumber || 1,
                        releaseDate: manga.releaseDate,
                        mangaTitle: manga.mangaTitle || manga.title,
                        mangaUrl: `${BASE_URL}/manga/${manga.slug || slug}`,
                    }}
                />
            )}
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Beranda', url: BASE_URL },
                        { name: 'Manga', url: `${BASE_URL}/manga` },
                        { name: manga?.mangaTitle || manga?.title || 'Chapter', url: `${BASE_URL}/manga/${manga?.slug || slug}` },
                        { name: manga?.title || 'Chapter', url: `${BASE_URL}/manga/chapter/${slug}` },
                    ],
                }}
            />
            <DetailsChapter params={{ slug }} />
        </>
    )
} 