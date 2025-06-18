"use client"

import React, { useState } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { Search } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { DetailsMangaContentProps } from "@/hooks/pages/manga/details-manga/types/AnimeDetails"

import LoadingOverlay from '@/base/helper/LoadingOverlay'

export default function DetailsMangaContent({ mangaData }: DetailsMangaContentProps) {
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

    const filteredChapters = (mangaData.chapterList ?? []).filter((chapter) => {
        if (!chapter || chapter.title === undefined || chapter.title === null) return false;
        const titleStr = chapter.title.toString().toLowerCase();
        const searchStr = search.toLowerCase();

        // Extract chapter number if it exists
        const chapterMatch = titleStr.match(/chapter\s*(\d+)/i) || titleStr.match(/c\s*(\d+)/i);
        if (chapterMatch) {
            const chapterNum = chapterMatch[1];
            const paddedChapterNum = chapterNum.padStart(2, '0');
            return (
                titleStr.includes(searchStr) ||
                `chapter ${titleStr}`.includes(searchStr) ||
                `c${titleStr}`.includes(searchStr) ||
                `chapter ${paddedChapterNum}`.includes(searchStr) ||
                `c${paddedChapterNum}`.includes(searchStr)
            );
        }

        return (
            titleStr.includes(searchStr) ||
            `chapter ${titleStr}`.includes(searchStr) ||
            `c${titleStr}`.includes(searchStr)
        );
    });

    return (
        <section className='py-6 md:py-10'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading Chapter..."
                progress={loadingProgress}
            />
            <div className="container px-4">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8">
                    <Image
                        src={mangaData.poster}
                        alt={mangaData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">{mangaData.readerAge}</span>
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">{mangaData.mangaType}</span>
                            <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded font-semibold">{mangaData.status}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{mangaData.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {mangaData.genreList.map((genre) => (
                                <Link
                                    href={`genre/${genre.href}`}
                                    rel='noopener noreferrer'
                                    key={genre.genreId}
                                    className="text-xs text-gray-200 bg-gray-700/60 px-2 py-1 rounded"
                                    onClick={(e) => handleClick(e, `genre/${genre.href}`)}
                                >
                                    {genre.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-sm md:text-base">Read all chapters</button>
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
                                src={mangaData.poster}
                                alt={mangaData.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-md">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Indonesian Title:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.indonesianTitle || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Type:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.mangaType || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Author:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.author || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Status:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.status || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Reader Age:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.readerAge || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Reading Direction:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.readingDirection || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">First Chapter:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.firstChapter || 'N/A'}</span>

                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Latest Chapter:</span>
                                    <span className="text-gray-900 dark:text-gray-100">{mangaData.latestChapter || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
                        {mangaData.synopsis && mangaData.synopsis.paragraphs && mangaData.synopsis.paragraphs.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Synopsis
                                </h2>

                                <div className="prose dark:prose-invert max-w-none">
                                    {mangaData.synopsis.paragraphs.map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>
                                    ))}
                                </div>

                                {mangaData.synopsis.images && mangaData.synopsis.images.length > 0 && (
                                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {mangaData.synopsis.images.map((image, index) => (
                                            <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                                <Image
                                                    src={image}
                                                    alt={`Synopsis image ${index + 1}`}
                                                    fill
                                                    quality={100}
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                {mangaData.genreList.map((genre, index) => (
                                    <Link
                                        key={index}
                                        href={`genre/${genre.href}`}
                                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/70 transition-colors text-sm"
                                        onClick={(e) => handleClick(e, `genre/${genre.href}`)}
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
                                Chapters
                                <div className="group relative">
                                    <svg
                                        className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                        <p>Untuk chapter di bawah 100, tambahkan angka 0 di depan. Contoh:</p>
                                        <ul className="mt-1 list-disc list-inside">
                                            <li>Chapter 1 → cari &quot;01&quot;</li>
                                            <li>Chapter 2 → cari &quot;02&quot;</li>
                                            <li>Chapter 10 → cari &quot;10&quot;</li>
                                        </ul>
                                    </div>
                                </div>
                            </h2>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 mb-4 text-gray-400" />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search chapter..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="mb-4 w-full pl-10 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>
                            <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-2 overflow-hidden">
                                {filteredChapters.length > 0 ? (
                                    filteredChapters.map((chapter) => (
                                        <Link
                                            href={`chapter/${chapter.href}`}
                                            key={chapter.chapterId}
                                            className="flex items-center rounded-xl p-3 md:p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gray-800/70 hover:bg-gray-700/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/60"
                                            onClick={(e) => handleClick(e, `chapter/${chapter.href}`)}
                                        >
                                            <div className="relative">
                                                <Image
                                                    src={mangaData.poster}
                                                    alt={mangaData.title}
                                                    width={56}
                                                    height={56}
                                                    className="rounded-lg w-14 h-14 object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ml-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-sm md:text-base text-gray-100">{chapter.title}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-400">
                                                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        {chapter.views} views
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {chapter.releaseDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 text-lg md:text-xl text-blue-500 group-hover:text-blue-400">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-gray-400 text-center py-12">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-lg font-medium">No chapters found</p>
                                        <p className="text-sm mt-1">Try adjusting your search</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {mangaData.similarMangaList && mangaData.similarMangaList.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Similar Manga
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                    {mangaData.similarMangaList.map((manga, index) => (
                                        <Link
                                            key={index}
                                            href={manga.href}
                                            className="group"
                                            onClick={(e) => handleClick(e, manga.href)}
                                        >
                                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 shadow-md">
                                                <Image
                                                    src={manga.poster}
                                                    alt={manga.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                                />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {manga.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{manga.type}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{manga.views} views</p>
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