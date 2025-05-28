"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { GenreManga } from '@/types/manga'

import LoadingOverlay from '@/base/helper/LoadingOverlay'

import ImagePlaceholder from '@/base/helper/ImagePlaceholder'

import { useRouter } from 'next/navigation'

type Props = {
    anime: GenreManga;
}

export default function AnimeCard({ anime }: Props) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        const href = anime.href.replace(/\/komiku/, '');
        router.push(href);
    };

    return (
        <>
            <LoadingOverlay isLoading={isNavigating} message="Loading manga page..." />
            <Link href={anime.href.replace(/\/komiku/, '')} className="group relative" onClick={handleNavigation}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imageError ? (
                        <ImagePlaceholder className="w-full h-full" />
                    ) : (
                        <Image
                            src={anime.poster}
                            alt={anime.title}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-2 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm text-white rounded-md">
                            {anime.type || 'N/A'}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{anime.title}</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-200">
                            <div className="flex items-center gap-2">
                                <span>{anime.views || 'N/A'}</span>
                            </div>
                            <p className="line-clamp-2 text-gray-300">{anime.description}</p>
                            <div className="flex items-center justify-between mt-2">
                                <Link
                                    href={anime.firstChapterUrl || '#'}
                                    className="text-sm hover:text-blue-400 transition-colors"
                                >
                                    {anime.firstChapter}
                                </Link>
                                <Link
                                    href={anime.latestChapterUrl || '#'}
                                    className="text-sm hover:text-blue-400 transition-colors"
                                >
                                    {anime.latestChapter}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
} 