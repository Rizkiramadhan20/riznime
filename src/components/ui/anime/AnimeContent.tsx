import React from 'react'

import { Anime } from '@/types/anime';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { Calendar, Clock } from 'lucide-react';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

interface AnimeContentProps {
    animeData: {
        ongoing: {
            animeList: Anime[];
        };
    };
}

export default function AnimeContent({ animeData }: AnimeContentProps) {
    return (
        <section className='py-10 bg-gray-50 dark:bg-gray-900'>
            <div className='container px-4'>
                <div className='flex justify-between sm:items-center mb-12 flex-col sm:flex-row items-start gap-4'>
                    <div>
                        <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>Anime Terbaru</h3>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>Temukan anime terbaru yang sedang tayang</p>
                    </div>
                    <Link
                        href={"/anime-terbaru"}
                        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
                    >
                        Lihat Semua
                    </Link>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {
                        animeData.ongoing.animeList.map((Item, idx) => {
                            return (
                                <Link href={`/anime/${formatSlug(Item.href)}`} key={idx} rel=''>
                                    <Card className="group h-full bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer p-0">
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                            <Image
                                                src={Item.poster}
                                                alt={Item.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                priority={idx < 6}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center gap-2 text-xs text-gray-200">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {Item.episodes} eps
                                                    </span>
                                                    {Item.releaseDay && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {Item.releaseDay}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                                {Item.title}
                                            </h5>
                                            {Item.latestReleaseDate && (
                                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
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
            </div>
        </section>
    )
}
