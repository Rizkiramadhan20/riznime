"use client"

import React, { useState } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { Search } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { DetailsAnimeContentProps } from "@/hooks/pages/anime/types/AnimeDetails"

import LoadingOverlay from '@/base/helper/LoadingOverlay'

import { formatSlug } from "@/base/helper/FormatSlug"

export default function DetailsAnimeContent({ animeData }: DetailsAnimeContentProps) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setLoadingId(href);
        setLoadingProgress(0);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(href);
            }
        }, 100);
    };

    const filteredEpisodes = (animeData.episodeList ?? []).filter((ep) => {
        if (!ep || ep.title === undefined || ep.title === null) return false;
        const titleStr = ep.title.toString().toLowerCase();
        const searchStr = search.toLowerCase();
        return (
            titleStr.includes(searchStr) ||
            `episode ${titleStr}`.includes(searchStr) ||
            `e${titleStr}`.includes(searchStr)
        );
    });

    return (
        <section className='py-6 md:py-10'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading in progress"
                progress={loadingProgress}
            />
            <div className="container px-4">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8">
                    <Image
                        src={animeData.poster}
                        alt={animeData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">PG-13</span>
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">{animeData.duration}</span>
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">{animeData.aired.split(' ')[2]}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{animeData.title}</h1>
                        <div className="flex items-center gap-3">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-sm md:text-base">Play all episodes</button>
                            <button className="bg-gray-800/60 p-2 rounded-full text-white hover:bg-gray-700/80 transition">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="col-span-1">
                        <div className="relative aspect-[3/4] w-full max-w-[430px] md:max-w-[500px] mx-auto rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={animeData.poster}
                                alt={animeData.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-md">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Japanese:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.japanese || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Score:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.score || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Status:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.status || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Episodes:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.episodes || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Duration:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.duration || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Aired:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.aired || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Studios:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.studios || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Producers:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{animeData.producers || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
                        {animeData.synopsis && animeData.synopsis.paragraphs && animeData.synopsis.paragraphs.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Synopsis
                                </h2>

                                <div className="prose dark:prose-invert max-w-none">
                                    {animeData.synopsis.paragraphs.map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Genres
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {animeData.genreList.map((genre, index) => (
                                    <Link
                                        key={index}
                                        href={`/anime/genres/${genre.href}`}
                                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-colors text-sm"
                                        onClick={(e) => handleClick(e, `/anime/genres/${genre.href}`)}
                                    >
                                        {genre.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Episodes
                            </h2>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 mb-4 text-gray-400" />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search episode..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="mb-4 w-full pl-10 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                            <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                {filteredEpisodes.length > 0 ? (
                                    filteredEpisodes.map((ep) => (
                                        <Link
                                            href={`/anime/episode/${formatSlug(ep.href)}`}
                                            key={ep.episodeId}
                                            className="flex items-center rounded-xl p-2 md:p-3 shadow transition-all duration-300 bg-gray-800/70 hover:bg-gray-700/80"
                                            onClick={(e) => handleClick(e, `/anime/episode/${formatSlug(ep.href)}`)}
                                        >
                                            <div className="relative">
                                                <Image
                                                    src={animeData.poster}
                                                    alt={animeData.title}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-lg w-12 h-12 object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ml-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm md:text-base text-gray-100">E{ep.title}</span>
                                                    <span className="text-xs text-gray-400">{animeData.duration}</span>
                                                </div>
                                                <div className="text-xs md:text-sm truncate text-gray-400">Episode {ep.title}</div>
                                            </div>
                                            <div className="ml-4 text-lg md:text-xl text-blue-500 group-hover:text-blue-400">▶</div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-gray-400 text-center py-8">No episodes found.</div>
                                )}
                            </div>
                        </div>

                        {animeData.recommendedAnimeList && animeData.recommendedAnimeList.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Recommended Anime
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                    {animeData.recommendedAnimeList.map((anime, index) => (
                                        <Link
                                            key={index}
                                            href={`/anime/${formatSlug(anime.href)}`}
                                            className="group"
                                            onClick={(e) => handleClick(e, `/anime/${formatSlug(anime.href)}`)}
                                        >
                                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 shadow-md">
                                                <Image
                                                    src={anime.poster}
                                                    alt={anime.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                                />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {anime.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
} 