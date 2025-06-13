import React, { Fragment } from 'react';

import { fetchDaftarAnimeData } from '@/lib/FetchAnime';

import { fetchGenresData } from "@/lib/FetchAnime"

import DaftarAnimeContent from '@/hooks/pages/anime/daftar-anime/abjad/DaftarAnimeContent';

import GenreContent from "@/hooks/pages/anime/daftar-anime/genres/GenresContent"

import DaftarAnimeSkeleton from '@/hooks/pages/anime/daftar-anime/abjad/DaftarAnimeSkeleton';

export default async function DaftarAnimeLayout() {
    try {
        const animeData = await fetchDaftarAnimeData();
        const genresData = await fetchGenresData();
        return <Fragment>
            <GenreContent genresData={genresData} />
            <DaftarAnimeContent animeData={animeData} />
        </Fragment>;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <DaftarAnimeSkeleton />
        );
    }
}
