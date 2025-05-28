import React from 'react';

import { fetchMangaPopularData } from '@/lib/FetchManga';

import PopularMangaLayout from '@/hooks/pages/manga/popular/PopularMangaLayout';

import PopularMangaSkelaton from '@/hooks/pages/manga/popular/PopularSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Populer | Riznime',
    description: 'Manga Populer',
}

export default async function Popular() {
    try {
        const mangaData = await fetchMangaPopularData();
        return <PopularMangaLayout mangaData={mangaData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <PopularMangaSkelaton />
        );
    }
}
