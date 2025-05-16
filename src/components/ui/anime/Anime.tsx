import React from 'react';

import { fetchAnimeData } from '@/lib/FetchAnime';

import AnimeContent from '@/components/ui/anime/AnimeContent';

import BannerSkeleton from '@/components/ui/anime/AnimeSkelaton';

export default async function Anime() {
    try {
        const animeData = await fetchAnimeData();
        return <AnimeContent animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <BannerSkeleton />
        );
    }
}
