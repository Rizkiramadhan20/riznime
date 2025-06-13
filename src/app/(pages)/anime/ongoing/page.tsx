import React from 'react';

import { fetchOngoingData } from '@/lib/FetchAnime';

import AnimeOngoing from '@/hooks/pages/ongoing/AnimeOngoing';

import AnimeOngoingSkeleton from '@/hooks/pages/ongoing/AnimeOngoingSkeleton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime | Riznime',
    description: 'Daftar Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

export default async function Ongoing() {
    try {
        const animeData = await fetchOngoingData();
        return <AnimeOngoing animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeOngoingSkeleton />
        );
    }
}
