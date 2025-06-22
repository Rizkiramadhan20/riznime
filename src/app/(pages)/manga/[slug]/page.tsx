import React from 'react'

import { Metadata, ResolvingMetadata } from "next"

import DetailsManga from "@/hooks/pages/manga/details-manga/DetailsManga"

import { fetchMangaBySlug } from "@/lib/FetchManga"

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