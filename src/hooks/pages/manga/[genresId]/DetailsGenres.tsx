import React from 'react'

import { fetchMangaGenresId } from '@/lib/FetchManga'

import GenreAnimeSlider from '@/hooks/pages/manga/[genresId]/components/GenreAnimeSlider'

import GenrePagination from '@/hooks/pages/manga/[genresId]/components/GenrePagination'

import AnimeCard from '@/hooks/pages/manga/[genresId]/components/AnimeCard'

import { GenreMangaListResponse, GenreManga } from "@/types/manga"

import DetailsGenresSkelaton from "@/hooks/pages/genres/DetailsGenresSkelaton"

interface Props {
    genreId: string;
    searchParams: { page?: string };
}

export default async function DetailsGenres({ genreId, searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const response = await fetchMangaGenresId(genreId, page) as GenreMangaListResponse | null;

    if (!response) {
        return (
            <DetailsGenresSkelaton />
        );
    }

    const { animeList } = response.data;
    const { pagination } = response;

    // Take the top 3 anime for the slider
    const top3Anime = animeList.slice(0, 2);
    // Get the rest of the anime for the grid
    const restOfAnime = animeList.slice(2);

    return (
        <section className='py-8'>
            <div className="container px-4">
                {/* Render the slider with the top 3 anime */}
                <GenreAnimeSlider animeList={top3Anime} />

                {/* Render the rest of the anime in a grid */}
                {restOfAnime.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {restOfAnime.map((anime: GenreManga) => (
                            <AnimeCard key={anime.mangaId} anime={anime} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && (
                    <GenrePagination
                        genreId={genreId}
                        currentPage={pagination.currentPage}
                        totalPages={pagination.nextPage}
                    />
                )}
            </div>
        </section>
    )
}
