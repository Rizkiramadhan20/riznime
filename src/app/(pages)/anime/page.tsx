import React, { Fragment } from 'react';

import { Metadata } from 'next';

import { fetchDaftarAnimeData } from '@/lib/FetchDaftarAnime';

import { fetchGenresData } from "@/lib/FetchAnime"

import DaftarAnimeContent from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeContent';

import GenreContent from "@/hooks/pages/daftar-anime/genres/GenresContent"

import DaftarAnimeSkeleton from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeSkeleton';

export const metadata: Metadata = {
    title: 'Anime | Riznime',
    description: 'Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

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
