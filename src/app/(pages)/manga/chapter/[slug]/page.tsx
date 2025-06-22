import React from 'react'

import DetailsChapter from "@/hooks/pages/manga/chapter/DetailsChapter"

import { Metadata, ResolvingMetadata } from "next"

import { fetchMangaByChapter } from "@/lib/FetchManga"

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
        description: manga.synopsis?.paragraphs?.[0] || `Watch ${manga.title} online.`,
        openGraph: {
            title: `${manga.title} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Watch ${manga.title} online.`,
            images: [manga.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${manga.title} | Riznime`,
            description: manga.synopsis?.paragraphs?.[0] || `Watch ${manga.title} online.`,
            images: [manga.poster],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <DetailsChapter params={{ slug }} />
    )
} 