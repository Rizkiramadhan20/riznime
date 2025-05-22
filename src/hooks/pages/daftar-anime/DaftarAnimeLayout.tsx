import React, { Fragment } from 'react';

import { fetchDaftarAnimeData } from '@/lib/FetchDaftarAnime';

import { fetchGenresData } from "@/lib/FetchAnime"

import DaftarAnimeContent from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeContent';

import GenreContent from "@/hooks/pages/daftar-anime/genres/GenresContent"

import DaftarAnimeSkeleton from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeSkeleton';

export default async function DaftarAnimeLayout() {
    try {
        const animeData = await fetchDaftarAnimeData();
        const genresData = await fetchGenresData();
        return <Fragment>
            <DaftarAnimeContent animeData={animeData} />
            <GenreContent genresData={genresData} />
        </Fragment>;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <DaftarAnimeSkeleton />
        );
    }
}
