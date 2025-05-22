import React from 'react';

import { fetchMangaData } from '@/lib/FetchManga';

import MangaContent from '@/hooks/pages/manga/MangaContent';

import MangaSkelaton from '@/hooks/pages/manga/MangaSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Riznime | Manga',
    description: 'Halaman Manga',
}

export default async function Manga() {
    try {
        const mangaData = await fetchMangaData();
        return <MangaContent mangaData={mangaData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <MangaSkelaton />
        );
    }
}
