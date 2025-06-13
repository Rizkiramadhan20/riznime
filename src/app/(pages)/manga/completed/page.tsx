import React from 'react';

import { fetchMangaCompletedData } from '@/lib/FetchManga';

import CompletedMangaLayout from '@/hooks/pages/manga/completed/CompletedMangaLayout';

import CompletedSkelaton from '@/hooks/pages/manga/completed/CompletedSkelaton.';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Completed | Riznime',
    description: 'Manga Completed',
}

export default async function Popular() {
    try {
        const mangaData = await fetchMangaCompletedData();
        return <CompletedMangaLayout mangaData={mangaData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <CompletedSkelaton />
        );
    }
}
