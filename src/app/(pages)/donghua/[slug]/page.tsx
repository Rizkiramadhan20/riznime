import React from 'react'

import DetailsAnime from "@/hooks/pages/anichin/anime/DetailsDonghua"

import { Metadata, ResolvingMetadata } from "next"

import { fetchDonghuaBySlug } from "@/lib/FetchAnichin"

type Props = {
    params: Promise<{ slug: string }>
}

async function getDonghuaData(slug: string) {
    try {
        // Use fetchDonghuaBySlug to get the data
        const data = await fetchDonghuaBySlug(slug);
        return data;
    } catch (error) {
        console.error("Error fetching Donghua data:", error);
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
    const animeData = await getDonghuaData(slug);
    const anime = animeData?.data;

    if (!anime) {
        return {
            title: "Donghua Not Found",
            description: "The requested Donghua could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${anime.title || anime.japan || 'Donghua'} | RizNime`,
        description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title || anime.japan || 'this anime'} online.`,
        openGraph: {
            title: `${anime.title || anime.japan || 'Donghua'} | RizNime`,
            description: anime.synopsis?.paragraphs?.[0] || `Watch ${anime.title || anime.japan || 'this anime'} online.`,
            images: [anime.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${anime.title || anime.japan || 'Donghua'} | RizNime`,
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