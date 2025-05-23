import React from 'react';

import { fetchMangaRecentData } from '@/lib/FetchManga';

import RecentMangaLayout from '@/hooks/pages/manga/recent/RecentMangaLayout';

import RecentMangaSkelaton from '@/hooks/pages/manga/recent/RecentMangaSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Terbaru | Riznime',
    description: 'Manga Terbaru',
}

export default async function Ongoing() {
    try {
        const mangaData = await fetchMangaRecentData();
        return <RecentMangaLayout mangaData={mangaData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <RecentMangaSkelaton />
        );
    }
}
