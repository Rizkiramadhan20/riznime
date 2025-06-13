import React, { Suspense } from 'react';

import { fetchMangaOngoingData } from '@/lib/FetchManga';

import OngoingMangaLayout from '@/hooks/pages/manga/ongoing/OngoingLayout';

import OngoingMangaSkelaton from '@/hooks/pages/manga/ongoing/OngoingMangaSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Ongoing | Riznime',
    description: 'Manga Ongoing',
}

export default async function Ongoing() {
    try {
        const mangaData = await fetchMangaOngoingData();
        return (
            <Suspense fallback={<OngoingMangaSkelaton />}>
                <OngoingMangaLayout mangaData={mangaData} />
            </Suspense>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <OngoingMangaSkelaton />
        );
    }
}
