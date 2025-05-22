import React from 'react'

import DetailsMangaSkelaton from '@/hooks/pages/manga/details-manga/DetailsMangaSkelaton'

import { fetchMangaBySlug } from '@/lib/FetchManga'

import DetailsMangaContent from '@/hooks/pages/manga/details-manga/DetailsMangaContent'

import { DetailsMangaProps, ApiResponse } from "@/hooks/pages/manga/details-manga/types/AnimeDetails"

export default async function DetailsManga({ params }: DetailsMangaProps) {
    const { slug } = params;
    let mangaResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        mangaResponse = await fetchMangaBySlug(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load manga data";
    }

    if (error || !mangaResponse || !mangaResponse.ok) {
        return (
            <DetailsMangaSkelaton />
        );
    }

    const mangaData = mangaResponse.data;

    return (
        <DetailsMangaContent mangaData={mangaData} />
    )
} 