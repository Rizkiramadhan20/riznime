import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAnimeBySlug } from '@/lib/FetchAnimeSlug'

// Define types for the anime data
interface Genre {
    title: string;
    genreId: string;
    href: string;
    otakudesuUrl: string;
}

interface Episode {
    title: number;
    episodeId: string;
    href: string;
    otakudesuUrl: string;
}

interface SynopsisData {
    paragraphs: string[];
    connections: unknown[];
}

interface RecommendedAnime {
    title: string;
    poster: string;
    animeId: string;
    href: string;
    otakudesuUrl: string;
}

interface AnimeData {
    title: string;
    poster: string;
    japanese: string;
    english?: string;
    score: string;
    producers: string;
    status: string;
    episodes: number;
    duration: string;
    aired: string;
    studios: string;
    batch: string | null;
    synopsis: SynopsisData;
    genreList: Genre[];
    episodeList: Episode[];
    recommendedAnimeList: RecommendedAnime[];
}

interface ApiResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    ok: boolean;
    data: AnimeData;
    pagination: null | unknown;
}

interface DetailsAnimeProps {
    params: {
        slug: string;
    };
}

export default async function DetailsAnime({ params }: DetailsAnimeProps) {
    const { slug } = params;
    let animeResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        animeResponse = await fetchAnimeBySlug(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load anime data";
    }

    if (error || !animeResponse || !animeResponse.ok) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading anime data</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error || animeResponse?.message || "Unknown error"}</p>
                                <p className="mt-2">Please try again later or check if the anime exists.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-4">Anime Not Found</h1>
                <p>We couldn&apos;t find the anime information for &quot;{slug}&quot;.</p>
            </div>
        );
    }

    const animeData = animeResponse.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{animeData.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <Image
                        src={animeData.poster}
                        alt={animeData.title}
                        width={500}
                        height={500}
                        className="w-full rounded-lg shadow-lg"
                    />
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-600">Japanese:</span>
                            <span>{animeData.japanese}</span>

                            <span className="text-gray-600">Score:</span>
                            <span>{animeData.score}</span>

                            <span className="text-gray-600">Status:</span>
                            <span>{animeData.status}</span>

                            <span className="text-gray-600">Episodes:</span>
                            <span>{animeData.episodes}</span>

                            <span className="text-gray-600">Duration:</span>
                            <span>{animeData.duration}</span>

                            <span className="text-gray-600">Aired:</span>
                            <span>{animeData.aired}</span>

                            <span className="text-gray-600">Studios:</span>
                            <span>{animeData.studios}</span>

                            <span className="text-gray-600">Producers:</span>
                            <span>{animeData.producers}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                        {animeData.synopsis.paragraphs.map((paragraph, index) => (
                            <p key={index} className="mb-3">{paragraph}</p>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {animeData.genreList.map((genre, index) => (
                                <Link
                                    key={index}
                                    href={genre.href}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                                >
                                    {genre.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Episodes</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {animeData.episodeList.map((episode, index) => (
                                <Link
                                    key={index}
                                    href={episode.href}
                                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded text-center"
                                >
                                    Episode {episode.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {animeData.recommendedAnimeList && animeData.recommendedAnimeList.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Recommended Anime</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {animeData.recommendedAnimeList.map((anime, index) => (
                                    <Link key={index} href={anime.href} className="block group">
                                        <div className="aspect-[3/4] overflow-hidden rounded-lg mb-2">
                                            <Image
                                                src={anime.poster}
                                                alt={anime.title}
                                                width={500}
                                                height={500}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <h3 className="text-sm font-medium truncate">{anime.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 