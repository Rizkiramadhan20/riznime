import React from 'react';

import { fetchAnimeData } from '@/lib/FetchAnime';

import AnimeContent from '@/components/ui/anime/AnimeContent';

import AnimeContentSkeleton from '@/components/ui/anime/AnimeContentSkeleton';

export default async function Anime() {
    try {
        const animeData = await fetchAnimeData();
        return <AnimeContent animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <AnimeContentSkeleton />
        );
    }
}
