import React, { Fragment } from 'react';

import { Metadata } from 'next';

import { fetchDaftarAnimeData } from '@/lib/FetchDaftarAnime';

import { fetchGenresData } from "@/lib/FetchAnime"

import DaftarAnimeContent from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeContent';

import GenreContent from "@/hooks/pages/daftar-anime/genres/GenresContent"

import DaftarAnimeSkeleton from '@/hooks/pages/daftar-anime/abjad/DaftarAnimeSkeleton';

export const metadata: Metadata = {
    title: 'Daftar Anime | Riznime',
    description: 'Daftar Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

export default async function Anime() {
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
