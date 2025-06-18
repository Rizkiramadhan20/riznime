import React from 'react';

import { fetchOngoinData } from '@/lib/FetchAnime';

import AnimeOngoing from '@/hooks/pages/anime/ongoing/AnimeOngoing';

import AnimeOngoingSkeleton from '@/hooks/pages/anime/ongoing/AnimeOngoinSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime | Riznime',
    description: 'Daftar Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

export default async function Ongoing() {
    try {
        const response = await fetchOngoinData();
        const animeData = {
            animeList: response.data.animeList,
            pagination: response.pagination
        };
        return <AnimeOngoing animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeOngoingSkeleton />
        );
    }
}