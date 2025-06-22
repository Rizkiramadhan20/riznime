import React from 'react'
import Link from 'next/link'

import { fetchMangaGenresId } from '@/lib/FetchManga'

import GenreMangaSlider from '@/hooks/pages/manga/[genresId]/components/GenreMangaSlider'

import GenrePagination from '@/hooks/pages/manga/[genresId]/components/GenrePagination'

import MangaCard from '@/hooks/pages/manga/[genresId]/components/MangaCard'

import { GenreMangaListResponse, GenreManga } from "@/types/manga"

import DetailsGenresSkelaton from "@/hooks/pages/anime/genres/DetailsGenresSkelaton"

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

    const { komikuList } = response.data;
    const { pagination } = response;

    // Check if animeList is empty
    if (komikuList.length === 0) {
        return (
            <section className='py-8 min-h-screen flex items-center justify-center'>
                <div className="container px-4">
                    <div className="text-center py-12 bg-card-bg rounded-2xl shadow-sm border border-card-border">
                        <div className="flex justify-center mb-6">
                            <svg className="w-28 h-28 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-text mb-3">Tidak ada manga yang ditemukan</h2>
                        <p className="text-text-secondary mb-8">Silakan coba genre atau halaman lainnya</p>
                        <Link
                            href="/manga"
                            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Kembali ke Manga
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Take the top 3 anime for the slider
    const top3Manga = komikuList.slice(0, 2);
    // Get the rest of the anime for the grid
    const restOfManga = komikuList.slice(2);


    return (
        <section className='py-8'>
            <div className="container px-4">
                {/* Render the slider with the top 3 manga */}
                <GenreMangaSlider mangaList={top3Manga} />

                {/* Render the rest of the manga in a grid */}
                {restOfManga.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {restOfManga.map((manga: GenreManga) => (
                            <MangaCard key={manga.mangaId} manga={manga} />
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
