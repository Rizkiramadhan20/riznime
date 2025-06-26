import React from 'react'

import { fetchAnimeGenresId } from '@/lib/FetchAnime'

import GenreAnimeSlider from '@/hooks/pages/anime/genres/components/GenreAnimeSlider'

import GenrePagination from '@/hooks/pages/anime/genres/components/GenrePagination'

import AnimeCard from '@/hooks/pages/anime/genres/components/AnimeCard'

import { AnimeResponse, Props, AnimeId } from "@/interface/anime"

import DetailsGenresSkelaton from "@/hooks/pages/anime/genres/DetailsGenresSkelaton"

export default async function DetailsGenres({ genreId, searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

    const response = await fetchAnimeGenresId(genreId, page) as AnimeResponse | null;

    if (!response) {
        return (
            <DetailsGenresSkelaton />
        );
    }

    const { data: { animeList }, pagination } = response;

    // Take the top 3 anime for the slider
    const top3Anime = animeList.slice(0, 3);
    // Get the rest of the anime for the grid
    const restOfAnime = animeList.slice(3);

    return (
        <section className='py-8'>
            <div className="container px-4">
                {/* Render the slider with the top 3 anime */}
                <GenreAnimeSlider animeList={top3Anime} />

                {/* Render the rest of the anime in a grid */}
                {restOfAnime.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
                        {restOfAnime.map((anime: AnimeId) => (
                            <AnimeCard key={anime.animeId} anime={anime} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && (
                    <GenrePagination
                        genreId={genreId}
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                    />
                )}
            </div>
        </section>
    )
}
