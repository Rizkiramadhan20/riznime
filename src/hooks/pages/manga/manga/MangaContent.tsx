"use client"
import React, { useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import MangaSidebar from '@/hooks/pages/manga/manga/components/MangaSidebar'

import Pagination from '@/base/helper/Pagination'

interface MangaData {
    recent: {
        animeList: Array<{
            title: string
            poster: string
            animeId: string
            href: string
            type: string
            latestChapter: string
            latestChapterUrl: string
            episodes: string
            releasedOn: string
        }>
    }
    komiku_popular: {
        mangaList: Array<{
            title: string
            poster: string
            mangaId: string
            href: string
            type: string
            latestChapter: string
            latestChapterUrl: string
        }>
    }
    manga_popular: {
        mangaList: Array<{
            title: string
            poster: string
            mangaId: string
            href: string
            type: string
            latestChapter: string
            latestChapterUrl: string
        }>
    }
    komiku_recommendation: {
        mangaList: Array<{
            title: string
            poster: string
            mangaId: string
            href: string
            type: string
            latestChapter: string
            latestChapterUrl: string
        }>
    }
}

export default function MangaContent({ mangaData }: { mangaData: MangaData }) {
    const banner = mangaData.recent.animeList[0];
    const recentList = mangaData.recent.animeList.slice(1); // Exclude banner
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(mangaData.komiku_popular.mangaList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = mangaData.komiku_popular.mangaList.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section className='py-12'>
            <div className="container px-4 mx-auto">
                {/* Banner Section */}
                <div className="bg-header-bg rounded-3xl border border-[var(--card-border)] mb-8 md:mb-16 flex flex-col md:flex-row items-center overflow-hidden relative">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />

                    {/* Left: Info */}
                    <div className="flex-1 p-6 md:p-12 z-10">
                        <div className="mb-3 flex flex-wrap gap-2 text-xs uppercase tracking-widest text-text-secondary font-semibold">
                            <span className="bg-primary/10 px-3 py-1 rounded-full">RECENT</span>
                            <span className="px-3 py-1 bg-secondary rounded-full text-white">{banner.type}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 md:mb-6 drop-shadow-lg leading-tight">
                            {banner.title}
                        </h1>
                        <p className="text-text-secondary mb-6 md:mb-8 text-sm md:text-lg flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {banner.latestChapter}
                            </span>
                            <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                            <span>{banner.releasedOn}</span>
                        </p>
                        <Link href={banner.href}>
                            <span className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                                Baca Sekarang
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Right: Image */}
                    <div className="flex-1 flex items-center justify-center relative min-h-[250px] sm:min-h-[350px] md:min-h-[500px] w-full md:w-1/2">
                        <Image
                            src={banner.poster}
                            alt={banner.title}
                            fill
                            className="object-contain md:object-cover drop-shadow-2xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {/* Overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-l from-header-bg/90 to-transparent md:hidden" />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                    {/* Main Content */}
                    <article className="flex-1">
                        <div className='flex flex-col gap-6 md:gap-8 bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl'>
                            <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                                <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>Recent Updates</h3>
                                <Link href={"/recent"} className='text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2'>
                                    Lihat Semua
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {recentList.map((manga) => (
                                    <div key={manga.animeId} className="bg-card-bg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                                        <Link href={manga.href} className="group">
                                            <div className="relative w-full aspect-[3/4]">
                                                <Image
                                                    src={manga.poster}
                                                    alt={manga.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 p-3 md:p-4">
                                                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full w-fit">{manga.type}</span>
                                                <h5 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-200">{manga.title}</h5>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-text-secondary">{manga.latestChapter}</span>
                                                    <span className="text-xs text-text-secondary">{manga.releasedOn}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar - Only Popular Manga */}
                    <MangaSidebar
                        popularManga={mangaData.manga_popular.mangaList}
                    />
                </div>

                {/* RizNime Popular */}
                <div className='mb-8 md:mb-12 mt-12 md:mt-16'>
                    <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6 mb-6 md:mb-8'>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">RizNime Popular</h2>
                        <Link href={"/popular"} className='text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2'>
                            Lihat Semua
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
                        {
                            currentItems.map((item) => {
                                return (
                                    <div key={item.mangaId} className="bg-card-bg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                                        <Link href={item.href} className="group">
                                            <div className="relative w-full aspect-[3/4]">
                                                <Image
                                                    src={item.poster}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 p-3 md:p-4">
                                                <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full w-fit">{item.type}</span>
                                                <h5 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-200">{item.title}</h5>
                                                <span className="text-xs text-text-secondary">{item.latestChapter}</span>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mt-6 md:mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mb-8 md:mb-12 mt-12 md:mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-text">Recommendations</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {mangaData.komiku_recommendation.mangaList.map((manga) => (
                            <div key={manga.mangaId} className="bg-card-bg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                                <Link href={manga.href}>
                                    <div className="relative w-full aspect-[3/4]">
                                        <Image
                                            src={manga.poster}
                                            alt={manga.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-200"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h3 className="font-semibold text-sm line-clamp-2 text-text hover:text-primary transition-colors duration-200">{manga.title}</h3>
                                        <div className="mt-2 flex flex-col gap-1">
                                            <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full w-fit">{manga.type}</span>
                                            <p className="text-xs text-text-secondary">{manga.latestChapter}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
