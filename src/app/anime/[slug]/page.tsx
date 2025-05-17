import React from 'react'

import DetailsAnime from "@/components/ui/home/ui/anime/pages/anime/DetailsAnime"

import { Metadata, ResolvingMetadata } from "next"

import axios from "axios"

type Props = {
    params: Promise<{ slug: string }>
}

async function getAnimeData(slug: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/api/anime/${slug}`,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
            }
        );
        return response.data;
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
        title: `${anime.japanese || anime.english || 'Anime'} | My Anime`,
        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.japanese || anime.english || 'this anime'} online.`,
        openGraph: {
            title: `${anime.japanese || anime.english || 'Anime'} | My Anime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.japanese || anime.english || 'this anime'} online.`,
            images: [anime.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${anime.japanese || anime.english || 'Anime'} | My Anime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.japanese || anime.english || 'this anime'} online.`,
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