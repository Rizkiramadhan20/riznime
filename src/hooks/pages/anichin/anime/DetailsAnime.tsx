import React from 'react'

import DetailsAnimeSkeleton from '@/hooks/pages/anichin/anime/DetailsAnimeSkelaton'

import { fetchAnimeBySlug } from '@/lib/FetchAnichin'

import DetailsAnimeContent from '@/hooks/pages/anichin/anime/DetailsAnimeContent'

import { DetailsAnimeProps, ApiResponse } from "@/hooks/pages/anichin/anime/types/AnimeDetails"

export default async function DetailsAnime({ params }: DetailsAnimeProps) {
    const { slug } = params;
    let animeResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        animeResponse = await fetchAnimeBySlug(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load anime data";
    }

    if (error || !animeResponse || !animeResponse.ok) {
        return (
            <DetailsAnimeSkeleton />
        );
    }

    const animeData = animeResponse.data;

    return (
        <DetailsAnimeContent animeData={animeData} />
    )
} 