import React from 'react'

import DetailsEpisode from "@/hooks/pages/anime/episode/DetailsEpisode"

import StructuredData from '@/components/seo/StructuredData';

import { Metadata, ResolvingMetadata } from "next"

import { fetchEpisodeBySlug } from "@/lib/FetchAnime"

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

type Props = {
    params: Promise<{ slug: string }>
}

async function getAnimeData(slug: string) {
    try {
        const data = await fetchEpisodeBySlug(slug);
        return data;
    } catch (error) {
        console.error("Error fetching episode data:", error);
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
            title: "Episode Not Found",
            description: "The requested episode could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${anime.title} | Riznime`,
        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
        keywords: [
            anime.title,
            'Anime',
            'Episode',
            'Streaming',
            'Riznime',
            'Subtitle Indonesia',
            'Nonton Gratis'
        ],
        openGraph: {
            type: 'website',
            title: `${anime.title} | Riznime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
            url: `${BASE_URL}/anime/episode/${slug}`,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: anime.poster,
                    width: 1200,
                    height: 630,
                    alt: `${anime.title} - Riznime`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${anime.title} | Riznime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [anime.poster],
        },
        alternates: {
            canonical: `${BASE_URL}/anime/episode/${slug}`,
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
    const animeData = await getAnimeData(slug);
    const anime = animeData?.data;

    return (
        <>
            {anime && (
                <StructuredData
                    type="episode"
                    data={{
                        title: anime.title,
                        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title} online.`,
                        image: anime.poster,
                        url: `${BASE_URL}/anime/episode/${slug}`,
                        episodeNumber: anime.episodeNumber || 1,
                        seasonNumber: anime.seasonNumber || 1,
                        releaseDate: anime.releaseDate,
                        seriesTitle: anime.seriesTitle || anime.title,
                        seriesUrl: `${BASE_URL}/anime/${anime.slug || slug}`,
                    }}
                />
            )}
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Beranda', url: BASE_URL },
                        { name: 'Anime', url: `${BASE_URL}/anime` },
                        { name: anime?.title || 'Episode', url: `${BASE_URL}/anime/episode/${slug}` },
                    ],
                }}
            />
            <DetailsEpisode params={{ slug }} />
        </>
    )
} 