import React from 'react';

import { fetchGenresData } from '@/lib/FetchAnime';

import GenresContent from '@/components/ui/genres/GenresContent';

import GenresSkelaton from '@/components/ui/genres/GenresSkelaton';

export default async function Genres() {
    try {
        const genresData = await fetchGenresData();
        return <GenresContent genresData={genresData} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <GenresSkelaton />
        );
    }
}
