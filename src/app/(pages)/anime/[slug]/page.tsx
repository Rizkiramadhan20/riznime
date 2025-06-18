import React from 'react'

import DetailsAnime from "@/hooks/pages/anime/DetailsAnime"

import { Metadata, ResolvingMetadata } from "next"

import { fetchAnimeBySlug } from "@/lib/FetchAnime"

type Props = {
    params: Promise<{ slug: string }>
}

async function getAnimeData(slug: string) {
    try {
        // Use fetchAnimeBySlug to get the data
        const data = await fetchAnimeBySlug(slug);
        return data;
    } catch (error) {
        console.error("Error fetching anime data:", error);
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
            title: "Anime Not Found",
            description: "The requested anime could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${anime.title || anime.japan || 'Anime'} | RizNime`,
        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title || anime.japan || 'this anime'} online.`,
        openGraph: {
            title: `${anime.title || anime.japan || 'Anime'} | RizNime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title || anime.japan || 'this anime'} online.`,
            images: [anime.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${anime.title || anime.japan || 'Anime'} | RizNime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title || anime.japan || 'this anime'} online.`,
            images: [anime.poster],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <DetailsAnime params={{ slug }} />
    )
} 