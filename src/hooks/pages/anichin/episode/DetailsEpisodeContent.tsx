"use client"

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { Search, Play } from 'lucide-react'

import { DetailsEpisodeContentProps, Episode, Genre, Server, PopularSeriesItem, Quality } from "@/hooks/pages/anichin/episode/types/EpisodeDetails"

import LoadingOverlay from '@/base/helper/LoadingOverlay'

import { formatSlug } from '@/base/helper/FormatSlug'

import { useManagementEpisodeAnichin } from '@/hooks/pages/anichin/episode/utils/useManagementEpisodeAnichin'

export default function DetailsEpisodeContent({ episodeData, slug }: DetailsEpisodeContentProps) {
    const {
        search,
        setSearch,
        selectedQuality,
        setSelectedQuality,
        selectedServer,
        currentStreamingUrl,
        isEpisodeLoading,
        isRecommendedLoading,
        popularFilter,
        setPopularFilter,
        isEpisodeActive,
        handleServerSelect,
        handleEpisodeClick,
        handleRecommendedClick,
        filteredEpisodes,
        getFilteredPopular,
    } = useManagementEpisodeAnichin({ episodeData, slug });

    return (
        <section className='py-8 md:py-12'>
            <LoadingOverlay isLoading={isEpisodeLoading} message="Loading episode..." />
            <LoadingOverlay isLoading={isRecommendedLoading} message="Loading anime..." />
            <div className="container px-4">
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-12">
                    <Image
                        src={episodeData.poster}
                        alt={episodeData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.type}</span>
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.duration}</span>
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.releaseTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{episodeData.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {episodeData.genreList.map((genre: Genre) => (
                                <Link href={`/anime/genres/${formatSlug(genre.href)}`} rel='noopener noreferrer' key={genre.genreId} className="text-sm text-gray-200 bg-gray-700/70 px-3 py-1.5 rounded-full hover:bg-gray-600/80 transition-colors">{genre.title}</Link>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                const iframeSection = document.querySelector('.aspect-video');
                                iframeSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105"
                        >
                            <Play className="w-5 h-5" />
                            Watch Now
                        </button>

                        <div className="flex items-center gap-4 mt-6">
                            {episodeData.hasPrevEpisode && episodeData.prevEpisode && (
                                <button
                                    onClick={() => episodeData.prevEpisode && handleEpisodeClick(episodeData.prevEpisode.href)}
                                    className="bg-gray-800/80 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700/90 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Episode {episodeData.prevEpisode?.title}
                                </button>
                            )}
                            {episodeData.hasNextEpisode && episodeData.nextEpisode && (
                                <button
                                    onClick={() => episodeData.nextEpisode && handleEpisodeClick(episodeData.nextEpisode.href)}
                                    className="bg-gray-800/80 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700/90 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105"
                                >
                                    Episode {episodeData.nextEpisode?.title}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-8 md:gap-10'>
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm md:w-[65%]">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Streaming
                        </h2>
                        <div className="space-y-6">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                                <iframe
                                    src={currentStreamingUrl}
                                    id='frame'
                                    className="absolute inset-0 w-full h-full"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                            <div className='flex gap-4'>
                                <div className="flex flex-wrap gap-3">
                                    <select
                                        value={selectedServer.serverId}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            const server = selectedQuality.serverList.find(s => s.serverId === e.target.value);
                                            if (server) {
                                                handleServerSelect(server);
                                            }
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {selectedQuality.serverList.map((server: Server) => (
                                            <option key={server.serverId} value={server.serverId}>
                                                {server.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <select
                                        value={selectedQuality.title}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            const quality = episodeData.server.qualities.find(q => q.title === e.target.value);
                                            if (quality && quality.serverList && quality.serverList.length > 0) {
                                                setSelectedQuality(quality);
                                                handleServerSelect(quality.serverList[0]);
                                            }
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {episodeData.server.qualities
                                            .filter(quality => quality.serverList && quality.serverList.length > 0)
                                            .map((quality: Quality) => (
                                                <option key={quality.title} value={quality.title}>
                                                    {quality.title}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm md:w-[35%]">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Episodes
                        </h2>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 mb-4 text-gray-400" />
                            </div>

                            <input
                                type="text"
                                placeholder="Search episode..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="mb-6 w-full pl-12 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-3">
                            {filteredEpisodes.length > 0 ? (
                                filteredEpisodes.map((ep: Episode) => (
                                    <Link
                                        href={`/donghua/episode/${formatSlug(ep.href)}`}
                                        key={ep.episodeId}
                                        className={`flex items-center gap-4 rounded-xl p-4 shadow-md transition-all duration-300 group relative ${isEpisodeActive(`/donghua/${formatSlug(ep.href)}`)
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 border-4 border-blue-300 dark:border-blue-400'
                                            : 'bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 border border-transparent'
                                            }`}
                                    >
                                        {isEpisodeActive(`/donghua/${formatSlug(ep.href)}`) && (
                                            <>
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-400 rounded-full"></div>
                                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-400 rounded-full"></div>
                                            </>
                                        )}
                                        <div className={`relative ${isEpisodeActive(`/donghua/${formatSlug(ep.href)}`) ? 'ring-2 ring-blue-300 dark:ring-blue-400' : ''}`}>
                                            <Image
                                                src={episodeData.poster}
                                                alt={episodeData.title}
                                                width={56}
                                                height={56}
                                                className="rounded-lg mr-4 w-14 h-14 md:w-full md:h-16 object-cover"
                                            />
                                            {isEpisodeActive(`/anime/${formatSlug(ep.href)}`) && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 rounded-lg">
                                                    <Play className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-semibold text-base md:text-lg line-clamp-1 ${isEpisodeActive(`/donghua/${formatSlug(ep.href)}`)
                                                    ? 'text-white'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}>{ep.title}</span>
                                            </div>
                                            <div className={`text-sm md:text-base truncate ${isEpisodeActive(`/donghua/${formatSlug(ep.href)}`)
                                                ? 'text-blue-100'
                                                : 'text-gray-600 dark:text-gray-300'
                                                }`}>Episode {ep.episodeNumber}</div>
                                        </div>
                                        <div className={`ml-4 text-xl md:text-2xl transition-colors ${isEpisodeActive(`/donghua/${formatSlug(ep.href)}`)
                                            ? 'text-white'
                                            : 'text-blue-500 group-hover:text-blue-400'
                                            }`}>▶</div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-gray-500 dark:text-gray-400 text-center py-8 md:py-10">No episodes found.</div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mt-8 md:mt-12">
                    {/* Info */}
                    <div>
                        <div className="bg-white dark:bg-gray-800/70 p-8 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center justify-center">
                            {/* Poster Image at the top of Info card */}
                            <div className="relative aspect-[2/3] w-full mb-6 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={episodeData.poster}
                                    alt={episodeData.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 224px"
                                    priority
                                />
                            </div>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                {/* Japanese Language */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Japanese</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.japanese}</dd>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Status</dt>
                                        <dd className="text-green-700 dark:text-green-300 font-semibold">{episodeData.status}</dd>
                                    </div>
                                </div>
                                {/* Producers */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Producers</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.producers}</dd>
                                    </div>
                                </div>
                                {/* Studios */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4h4m-2 0v4" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Studios</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.studios}</dd>
                                    </div>
                                </div>
                                {/* Country */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10l6 3" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Country</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.country}</dd>
                                    </div>
                                </div>
                                {/* Type */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900">
                                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21l3-1.5L15 21l-.75-4M4 4h16v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Type</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.type}</dd>
                                    </div>
                                </div>
                                {/* Duration */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900">
                                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Duration</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.duration}</dd>
                                    </div>
                                </div>
                                {/* Release */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Release</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.aired}</dd>
                                    </div>
                                </div>
                                {/* Score (highlighted) */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/60 shadow-md border-2 border-blue-300 dark:border-blue-700">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800">
                                        <svg className="w-5 h-5 text-blue-700 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-blue-700 dark:text-blue-200 text-sm font-medium">Score</dt>
                                        <dd className="text-blue-900 dark:text-blue-100 font-bold text-lg">{episodeData.score}</dd>
                                    </div>
                                </div>
                                {/* Season (highlighted) */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/60 shadow-md border-2 border-cyan-300 dark:border-cyan-700">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-200 dark:bg-cyan-800">
                                        <svg className="w-5 h-5 text-cyan-700 dark:text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-cyan-700 dark:text-cyan-200 text-sm font-medium">Season</dt>
                                        <dd className="text-cyan-900 dark:text-cyan-100 font-bold text-lg">{episodeData.season}</dd>
                                    </div>
                                </div>
                                {/* Episodes */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 shadow-sm">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
                                    </span>
                                    <div>
                                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-medium">Episodes</dt>
                                        <dd className="text-gray-900 dark:text-gray-100 font-semibold">{episodeData.episodes}</dd>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm h-fit sticky top-8">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Recommended Anime
                        </h2>
                        {/* Filter Buttons */}
                        <div className="flex gap-2 mb-6">
                            {['weekly', 'monthly', 'allTime', 'movies'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setPopularFilter(filter as 'weekly' | 'monthly' | 'allTime' | 'movies')}
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200
                                        ${popularFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'}`}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                            {getFilteredPopular().map((anime: PopularSeriesItem) => (
                                <button
                                    onClick={() => handleRecommendedClick(`/donghua/${formatSlug(anime.href)}`)}
                                    key={popularFilter === 'movies' ? `${anime.anichinId}-${anime.rank}` : anime.anichinId}
                                    className="group relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    <Image
                                        src={anime.poster}
                                        alt={anime.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                        <h3 className="text-white text-sm md:text-base font-medium line-clamp-2">{anime.title}</h3>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 