import React, { Fragment } from 'react';

import { fetchMangaData, fetchMangaOngoingData, fetchMangaGenreData, fetchMangaCompletedData } from '@/lib/FetchManga';

import MangaContent from '@/hooks/pages/manga/manga/MangaContent';

import MangaSkelaton from '@/hooks/pages/manga/manga/MangaSkelaton';

import OngoingContent from '@/hooks/pages/manga/manga/ongoing/OngoingContent';

import GenreContent from '@/hooks/pages/manga/genres/GenresContent';

import ManhuaContent from '@/hooks/pages/manga/manga/manhua/ManhuaContent';

import ManhwaContent from '@/hooks/pages/manga/manga/manhwa/ManhwaContent';

import CompletedContent from '@/hooks/pages/manga/manga/completed/CompletedContent';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Riznime | Manga',
    description: 'Halaman Manga',
}

export default async function Manga() {
    try {
        const mangaData = await fetchMangaData();
        const ongoingMangaData = await fetchMangaOngoingData();
        const genreMangaData = await fetchMangaGenreData();
        const completedMangaData = await fetchMangaCompletedData();

        return (
            <Fragment>
                <MangaContent mangaData={mangaData} />
                <GenreContent mangaData={genreMangaData} />
                <OngoingContent mangaData={ongoingMangaData} />
                <ManhuaContent mangaData={mangaData} />
                <ManhwaContent mangaData={mangaData} />
                <CompletedContent mangaData={completedMangaData} />
            </Fragment>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <MangaSkelaton />
        );
    }
}
