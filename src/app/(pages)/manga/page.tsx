import React, { Fragment } from 'react';

import { fetchMangaData, fetchMangaOngoingData, fetchMangaGenreData } from '@/lib/FetchManga';

import MangaContent from '@/hooks/pages/manga/manga/MangaContent';

import MangaSkelaton from '@/hooks/pages/manga/manga/MangaSkelaton';

import OngoingContent from '@/hooks/pages/manga/manga/ongoing/OngoingContent';

import GenreContent from '@/hooks/pages/manga/genres/GenresContent';

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


        return (
            <Fragment>
                <MangaContent mangaData={mangaData} />
                <GenreContent mangaData={genreMangaData} />
                <OngoingContent mangaData={ongoingMangaData} />
            </Fragment>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <MangaSkelaton />
        );
    }
}
