"use client"

import React, { useState } from 'react'

import { Anime } from '@/types/anime';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { Calendar, Clock } from 'lucide-react';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

import AsideCard from './aside/AsideCard';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { useRouter } from 'next/navigation';

interface AnimeContentProps {
    animeData: {
        ongoing: {
            animeList: Anime[];
        };
        completed: {
            animeList: Anime[];
        };
    };
}

export default function AnimeContent({ animeData }: AnimeContentProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const transformedData = {
        completed: {
            animeList: animeData.completed.animeList.map(anime => ({
                href: anime.href,
                title: anime.title,
                episodes: typeof anime.episodes === 'string' ? parseInt(anime.episodes) || 0 : anime.episodes || 0,
                score: typeof anime.score === 'string' ? parseFloat(anime.score) || 0 : 0,
                latestReleaseDate: anime.latestReleaseDate || '',
                poster: anime.poster
            }))
        }
    };

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
        <section className='py-16 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            <div className='container px-4'>
                <div className='flex justify-between sm:items-center mb-12 flex-col sm:flex-row items-start gap-6'>
                    <div>
                        <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Anime Terbaru</h3>
                        <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Temukan anime terbaru yang sedang tayang</p>
                    </div>
                    <Link
                        href={"/ongoing"}
                        className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/20'
                    >
                        Lihat Semua
                    </Link>
                </div>
                <div className='flex gap-8 flex-col xl:flex-row'>
                    <article className='w-full xl:w-3/4'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
                            {
                                animeData.ongoing.animeList.map((Item, idx) => {
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
                        </div>
                    </article>

                    <AsideCard animeData={transformedData} />
                </div>
            </div>
        </section>
    )
}
