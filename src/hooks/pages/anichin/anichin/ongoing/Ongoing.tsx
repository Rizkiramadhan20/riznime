"use client"

import React, { useState } from 'react'

import { AnichinData, AnimeItem } from '@/interface/anichin';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { Clock, Tv, Film } from 'lucide-react';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { useRouter } from 'next/navigation';

interface AnimeContentProps {
    anichinData: AnichinData;
}

export default function AnimeContent({ anichinData }: AnimeContentProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const handleAnimeClick = (e: React.MouseEvent<HTMLAnchorElement>, anichinId: string) => {
        e.preventDefault();
        setLoadingId(anichinId);
        setLoadingProgress(0);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(`/donghua/${formatSlug(anichinId)}`);
            }
        }, 100);
    };

    return (
        <section className='py-10 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            <div className='container px-4'>
                <div className='flex mb-12'>
                    <div>
                        <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Recommended</h3>
                        <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Temukan donghua yang direkomendasikan</p>
                    </div>
                </div>
                <div className='flex gap-8'>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
                        {
                            anichinData.ongoing.anichinList.map((Item: AnimeItem, idx) => {
                                return (
                                    <Link
                                        href={`/donghua/${formatSlug(Item.anichinId)}`}
                                        key={idx}
                                        onClick={(e) => handleAnimeClick(e, Item.anichinId)}
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
                                                <div className="absolute top-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="flex items-center gap-3 text-sm text-gray-200">
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            {Item.episode}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="flex items-center gap-3 text-sm text-gray-200">
                                                        <span className="flex items-center gap-1.5">
                                                            <Film className="w-4 h-4" />
                                                            {Item.quality}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Tv className="w-4 h-4" />
                                                            {Item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 p-4">
                                                <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                                    {Item.title}
                                                </h5>
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
