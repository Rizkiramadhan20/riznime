"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { Anime } from '@/interface/anime';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { Calendar, Clock } from 'lucide-react';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

import Pagination from '@/base/helper/Pagination';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { fetchOngoinData } from '@/lib/FetchAnime';

interface AnimeContentProps {
    animeData: {
        animeList: Anime[];
        pagination: {
            currentPage: number;
            totalPages: number;
        };
    };
}

export default function AnimeContent({ animeData }: AnimeContentProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(animeData.pagination.currentPage);
    const [animeList, setAnimeList] = useState(animeData.animeList);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Function to get URL parameters
    const getUrlParams = () => {
        if (typeof window === 'undefined') return new URLSearchParams();
        return new URLSearchParams(window.location.search);
    };

    const handlePageChange = useCallback(async (page: number) => {
        try {
            setLoadingProgress(0);
            // Scroll to top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Update URL with new page number
            router.push(`/anime/ongoing?page=${page}`);

            const data = await fetchOngoinData(page);
            setAnimeList(data.data.animeList);
            setCurrentPage(data.pagination.currentPage);
            setLoadingProgress(100);
            setTimeout(() => {
                setLoadingProgress(0);
            }, 500);
        } catch (error) {
            console.error('Failed to fetch anime data:', error);
            setLoadingProgress(0);
        }
    }, [router]);

    // Update page from URL on initial load
    useEffect(() => {
        const urlParams = getUrlParams();
        const page = urlParams.get('page');
        if (page && parseInt(page) !== currentPage) {
            handlePageChange(parseInt(page));
        }
    }, [currentPage, handlePageChange]);

    const handleAnimeClick = (e: React.MouseEvent<HTMLAnchorElement>, animeId: string) => {
        e.preventDefault();
        setLoadingId(animeId);
        setLoadingProgress(0);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(`/anime/${formatSlug(animeId)}`);
            }
        }, 100);
    };

    return (
        <section className='py-10 bg-gray-50 dark:bg-gray-900 z-50'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message={`Loading is progres`}
                progress={loadingProgress}
            />
            <div className='container px-4'>
                <div className='flex mb-12 flex-col gap-4'>
                    <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Anime Terbaru</h3>
                    <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Jelajahi koleksi anime terbaru yang sedang tayang</p>
                </div>

                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
                    {
                        animeList.map((Item, idx) => {
                            return (
                                <Link
                                    href={`/anime/${formatSlug(Item.href)}`}
                                    key={idx}
                                    onClick={(e) => handleAnimeClick(e, Item.href)}
                                >
                                    <Card className="group h-full bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer p-0 border-0">
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                            <Image
                                                src={Item.poster}
                                                alt={Item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                priority={idx < 6}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center gap-3 text-sm text-gray-200">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4" />
                                                        {Item.episodes} eps
                                                    </span>
                                                    {Item.releaseDay && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            {Item.releaseDay}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 p-4">
                                            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                                {Item.title}
                                            </h5>
                                            {Item.latestReleaseDate && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Update: {Item.latestReleaseDate}
                                                </p>
                                            )}
                                        </div>
                                    </Card>
                                </Link>
                            )
                        })
                    }
                </article>

                <div className="mt-8 z-[9999]">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={animeData.pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}