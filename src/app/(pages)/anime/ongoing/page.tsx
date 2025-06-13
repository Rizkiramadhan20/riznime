import React, { Suspense } from 'react';

import { fetchOngoingData } from '@/lib/FetchAnime';

import AnimeOngoing from '@/hooks/pages/anime/ongoing/AnimeOngoing';

import AnimeOngoingSkeleton from '@/hooks/pages/anime/ongoing/AnimeOngoingSkeleton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime | Riznime',
    description: 'Daftar Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

export default async function Ongoing() {
    try {
        const animeData = await fetchOngoingData();
        return (
            <Suspense fallback={<AnimeOngoingSkeleton />}>
                <AnimeOngoing animeData={animeData} />
            </Suspense>
        );
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeOngoingSkeleton />
        );
    }
}
