import React, { Fragment } from 'react';

import { fetchMangaData, fetchMangaOngoingData, fetchMangaGenreData, fetchMangaCompletedData } from '@/lib/FetchManga';

import MangaContent from '@/hooks/pages/manga/manga/MangaContent';

import MangaSkelaton from '@/hooks/pages/manga/manga/MangaSkelaton';

import OngoingContent from '@/hooks/pages/manga/manga/ongoing/OngoingContent';

import GenreContent from '@/hooks/pages/manga/genres/GenresContent';

import ManhuaContent from '@/hooks/pages/manga/manga/manhua/ManhuaContent';

import ManhwaContent from '@/hooks/pages/manga/manga/manhwa/ManhwaContent';

import CompletedContent from '@/hooks/pages/manga/manga/completed/CompletedContent';

import StructuredData from '@/components/seo/StructuredData';

import { metadata } from "@/hooks/pages/manga/meta/Metadata";

export { metadata };

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export default async function Manga() {
    try {
        const mangaData = await fetchMangaData();
        const ongoingMangaData = await fetchMangaOngoingData();
        const genreMangaData = await fetchMangaGenreData();
        const completedMangaData = await fetchMangaCompletedData();

        return (
            <Fragment>
                <StructuredData
                    type="website"
                    data={{
                        name: 'Riznime',
                        description: 'Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!',
                        url: BASE_URL,
                    }}
                />
                <StructuredData
                    type="breadcrumb"
                    data={{
                        items: [
                            { name: 'Beranda', url: BASE_URL },
                            { name: 'Manga', url: `${BASE_URL}/manga` },
                        ],
                    }}
                />
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
