import React from 'react';

import { fetchCompletedData } from '@/lib/FetchAnime';

import AnimeCompleted from '@/hooks/pages/anime/completed/AnimeCompleted';

import AnimeCompletedSkeleton from '@/hooks/pages/anime/completed/AnimeCompletedSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime Completed | Riznime',
    description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
}

export default async function Ongoing() {
    try {
        const response = await fetchCompletedData();
        const animeData = {
            animeList: response.data.animeList,
            pagination: response.pagination
        };
        return <AnimeCompleted animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeCompletedSkeleton />
        );
    }
}