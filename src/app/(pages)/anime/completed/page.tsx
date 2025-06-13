import React, { Suspense } from 'react';

import { fetchCompletedData } from '@/lib/FetchAnime';

import AnimeCompleted from '@/hooks/pages/anime/completed/AnimeCompleted';

import AnimeCompletedSkeleton from '@/hooks/pages/anime/completed/AnimeCompletedSkeleton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime Completed | Riznime',
    description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
}

export default async function Completed() {
    try {
        const animeData = await fetchCompletedData();
        return (
            <Suspense fallback={<AnimeCompletedSkeleton />}>
                <AnimeCompleted animeData={animeData} />
            </Suspense>
        );
    } catch (error) {
        console.error('Error fetching completed data:', error);
        return (
            <AnimeCompletedSkeleton />
        );
    }
}
