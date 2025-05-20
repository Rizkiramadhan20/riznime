"use client"

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { Search, Play, Download } from 'lucide-react'

import { DetailsEpisodeContentProps, Episode, Genre, Quality, Server, DownloadQuality, DownloadUrl } from "@/hooks/pages/episode/types/EpisodeDetails"

import { fetchServerUrl } from '@/lib/FetchServerUrl'

export default function DetailsEpisodeContent({ episodeData }: DetailsEpisodeContentProps) {
    const [search, setSearch] = useState('');
    const [selectedQuality, setSelectedQuality] = useState<Quality>(episodeData.server.qualities[0]);
    const [selectedServer, setSelectedServer] = useState<Server>(episodeData.server.qualities[0].serverList[0]);
    const [currentStreamingUrl, setCurrentStreamingUrl] = useState(episodeData.defaultStreamingUrl);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Selalu fetch dari server default saat mount
        handleServerSelect(selectedServer);
        // eslint-disable-next-line
    }, []);

    const handleServerSelect = async (server: Server) => {
        try {
            setIsLoading(true);
            const response = await fetchServerUrl(server.serverId);
            if (response.ok) {
                setSelectedServer(server);
                setCurrentStreamingUrl(response.data.url);
            }
        } catch (error) {
            console.error('Failed to fetch server URL:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredEpisodes = (episodeData.info.episodeList ?? []).filter((ep: Episode) => {
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
        <section className='py-8 md:py-12'>
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
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.info.type}</span>
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.info.duration}</span>
                            <span className="bg-gray-800/90 text-white text-sm px-3 py-1.5 rounded-full font-medium">{episodeData.releaseTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{episodeData.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {episodeData.info.genreList.map((genre: Genre) => (
                                <Link href={genre.href} rel='noopener noreferrer' key={genre.genreId} className="text-sm text-gray-200 bg-gray-700/70 px-3 py-1.5 rounded-full hover:bg-gray-600/80 transition-colors">{genre.title}</Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <a href={episodeData.defaultStreamingUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105">
                                <Play className="w-5 h-5" />
                                Watch Now
                            </a>
                            <button className="bg-gray-800/80 p-3 rounded-full text-white hover:bg-gray-700/90 transition-all duration-300 hover:scale-105">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            {episodeData.hasPrevEpisode && episodeData.prevEpisode && (
                                <Link href={episodeData.prevEpisode.href} className="bg-gray-800/80 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700/90 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Episode {episodeData.prevEpisode.title}
                                </Link>
                            )}
                            {episodeData.hasNextEpisode && episodeData.nextEpisode && (
                                <Link href={episodeData.nextEpisode.href} className="bg-gray-800/80 text-white px-6 md:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700/90 transition-all duration-300 text-base md:text-lg flex items-center gap-2 hover:scale-105">
                                    Episode {episodeData.nextEpisode.title}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
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
                                {isLoading ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    <iframe
                                        src={currentStreamingUrl}
                                        className="absolute inset-0 w-full h-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                )}
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
                                            if (quality) {
                                                setSelectedQuality(quality);
                                                handleServerSelect(quality.serverList[0]);
                                            }
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {episodeData.server.qualities.map((quality: Quality) => (
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
                                        href={ep.href}
                                        key={ep.episodeId}
                                        className={`flex items-center rounded-xl p-4 shadow-md transition-all duration-300 group ${ep.episodeId === episodeData.episodeId
                                            ? 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 border-4 border-blue-300 dark:border-blue-400'
                                            : 'bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 border border-transparent'
                                            }`}
                                    >
                                        <Image src={episodeData.poster} alt={episodeData.title} width={56} height={56} className="rounded-lg mr-4 w-14 h-14 md:w-16 md:h-16" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-semibold text-base md:text-lg ${ep.episodeId === episodeData.episodeId
                                                    ? 'text-white'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}>E{ep.title}</span>
                                                <span className={`text-sm ${ep.episodeId === episodeData.episodeId
                                                    ? 'text-blue-100'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                    }`}>{episodeData.info.duration}</span>
                                            </div>
                                            <div className={`text-sm md:text-base truncate ${ep.episodeId === episodeData.episodeId
                                                ? 'text-blue-100'
                                                : 'text-gray-600 dark:text-gray-300'
                                                }`}>Episode {ep.title}</div>
                                        </div>
                                        <div className={`ml-4 text-xl md:text-2xl transition-colors ${ep.episodeId === episodeData.episodeId
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-8 md:mt-12">
                    <div className="col-span-1">
                        <div className="relative aspect-[3/4] w-full max-w-[430px] md:max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={episodeData.poster}
                                alt={episodeData.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="mt-8 bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Type:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{episodeData.info.type}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Duration:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{episodeData.info.duration}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Release:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{episodeData.releaseTime}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Credit:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{episodeData.info.credit}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Encoder:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{episodeData.info.encoder}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2 space-y-8 md:space-y-10">
                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                <Download className="w-7 h-7 text-blue-500" />
                                Download
                            </h2>

                            <div className="space-y-6">
                                {episodeData.downloadUrl.qualities.map((quality: DownloadQuality) => (
                                    <div key={quality.title} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{quality.title}</h3>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{quality.size}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {quality.urls.map((url: DownloadUrl) => (
                                                <a
                                                    key={url.title}
                                                    href={url.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                                                >
                                                    {url.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {episodeData.recommendedAnimeList && episodeData.recommendedAnimeList.length > 0 && (
                    <div className="mt-8 md:mt-12">
                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Recommended Anime
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {episodeData.recommendedAnimeList.map((anime) => (
                                    <Link
                                        href={anime.href}
                                        key={anime.animeId}
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
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
} 