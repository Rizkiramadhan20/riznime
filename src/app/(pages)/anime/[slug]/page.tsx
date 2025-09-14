import React from 'react'

import DetailsAnime from "@/hooks/pages/anime/DetailsAnime"

import { Metadata } from "next"

import { fetchAnimeBySlug } from "@/lib/FetchAnime"

import { generateAnimeMetadata } from "@/hooks/pages/anime/meta/Metadata"

import StructuredData from "@/components/seo/StructuredData"

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
    { params }: Props
): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    // fetch data
    const animeData = await getAnimeData(slug);
    const anime = animeData?.data;

    if (!anime) {
        return {
            title: "Anime Not Found - Riznime",
            description: "The requested anime could not be found.",
        };
    }

    const title = anime.title || anime.japan || 'Anime';
    const description = anime.synopsis?.paragraphs?.[0] || `Tonton ${title} online dengan subtitle Indonesia. Streaming anime berkualitas tinggi secara gratis di Riznime.`;
    const image = anime.poster || '/desktop.jpg';

    return generateAnimeMetadata(title, description, image);
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const animeData = await getAnimeData(slug);
    const anime = animeData?.data;

    return (
        <>
            {anime && (
                <StructuredData
                    type="anime"
                    data={{
                        title: anime.title || anime.japan || 'Anime',
                        description: anime.synopsis?.paragraphs?.[0] || `Tonton ${anime.title || anime.japan || 'this anime'} online dengan subtitle Indonesia.`,
                        image: anime.poster || '/desktop.jpg',
                        url: `${process.env.NEXT_PUBLIC_URL}/anime/${slug}`,
                        genres: anime.genres || [],
                        releaseDate: anime.releaseDate,
                        updatedAt: new Date().toISOString(),
                        rating: anime.rating,
                        ratingCount: anime.ratingCount,
                        seasons: anime.seasons,
                        episodes: anime.episodes,
                        voiceActors: anime.voiceActors,
                        director: anime.director,
                    }}
                />
            )}
            <DetailsAnime params={{ slug }} />
        </>
    )
} 