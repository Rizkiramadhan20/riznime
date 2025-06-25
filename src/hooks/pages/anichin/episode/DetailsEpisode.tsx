import React from 'react'

import DetailsEpisodeSkeleton from '@/hooks/pages/anichin/episode/DetailsEpisodeSkelaton'

import { fetchEpisodeBySlug } from '@/lib/FetchAnichin'

import DetailsEpisodeContent from '@/hooks/pages/anichin/episode/DetailsEpisodeContent'

import { DetailsEpisodeProps, ApiResponse } from "@/hooks/pages/anichin/episode/types/EpisodeDetails"

export default async function DetailsEpisode({ params }: DetailsEpisodeProps) {
    const { slug } = params;
    let episodeResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        episodeResponse = await fetchEpisodeBySlug(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load episode data";
    }

    if (error || !episodeResponse || !episodeResponse.ok || !episodeResponse.data || !episodeResponse.data.server) {
        return (
            <DetailsEpisodeSkeleton />
        );
    }

    const episodeData = episodeResponse.data;

    return (
        <DetailsEpisodeContent episodeData={episodeData} />
    )
} 