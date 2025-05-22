import React from 'react'

import { Metadata, ResolvingMetadata } from "next"

import DetailsManga from "@/hooks/pages/manga/details-manga/DetailsManga"

import axios from "axios"

type Props = {
    params: Promise<{ slug: string }>
}

async function getAnimeData(slug: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/api/manga/${slug}`,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
            }
        );
        return response.data;
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
    const animeData = await getAnimeData(slug);
    const manga = animeData?.data;

    if (!manga) {
        return {
            title: "Manga Not Found",
            description: "The requested manga could not be found.",
        };
    }

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${manga.title || 'Manga'} | RizNime`,
        description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
        openGraph: {
            title: `${manga.title || 'Manga'} | RizNime`,
            description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
            images: [manga.poster, ...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${manga.title || 'Manga'} | RizNime`,
            description: manga.synopsis?.paragraphs?.[0] || `Reading ${manga.indonesianTitle || 'this manga'} online.`,
            images: [manga.poster],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return (
        <DetailsManga params={{ slug }} />
    )
} 