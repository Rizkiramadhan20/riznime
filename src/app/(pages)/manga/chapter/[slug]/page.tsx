import React from 'react'

import DetailsChapter from "@/hooks/pages/manga/chapter/DetailsChapter"

import { Metadata, ResolvingMetadata } from "next"

import { fetchMangaByChapter } from "@/lib/FetchManga"

type Props = {
    params: Promise<{ slug: string }>
}

async function getAnimeData(slug: string) {
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
    const animeData = await getAnimeData(slug);
    const anime = animeData?.data;

    if (!anime) {
        return {
            title: "chapter Not Found",
            description: "The requested chapter could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${anime.title} | Riznime`,
        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
        openGraph: {
            title: `${anime.title} | Riznime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
            images: [anime.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${anime.title} | Riznime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
            images: [anime.poster],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <DetailsChapter params={{ slug }} />
    )
} 