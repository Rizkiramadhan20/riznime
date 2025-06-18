"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoadingOverlay from '@/base/helper/LoadingOverlay';

interface MangaSidebarProps {
    popularManga: Array<{
        title: string;
        poster: string;
        mangaId: string;
        href: string;
        type: string;
        latestChapter: string;
    }>;
}

export default function MangaSidebar({ popularManga }: MangaSidebarProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = () => {
        setIsLoading(true);
    };

    return (
        <aside className='w-full xl:w-1/4'>
            <LoadingOverlay isLoading={isLoading} message="Loading content..." />
            <div className='sticky top-5'>
                <div className='flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg min-h-[400px] max-h-[250px] sm:min-h-[500px] sm:max-h-[95vh] overflow-y-auto'>
                    <div className='flex justify-between items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4'>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Popular Manga</h3>
                        <Link href={"/manga/popular"} onClick={handleLinkClick} className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium'>
                            Lihat Semua
                        </Link>
                    </div>

                    <div className='flex flex-row xl:flex-col gap-4 sm:gap-6 overflow-x-auto xl:overflow-x-visible pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent px-2 sm:px-0'>
                        {popularManga.map((manga) => (
                            <Link
                                key={manga.mangaId}
                                href={`manga/${manga.href}`}
                                onClick={handleLinkClick}
                                className='w-40 sm:w-44 xl:w-auto min-w-[160px] sm:min-w-[176px] xl:min-w-0 group flex-shrink-0 xl:flex-shrink'
                            >
                                <div className='flex flex-col xl:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-200'>
                                    <div className='relative w-full aspect-[3/4] xl:w-28 xl:aspect-[3/4] flex-shrink-0'>
                                        <Image
                                            src={manga.poster}
                                            alt={manga.title}
                                            fill
                                            className='object-cover w-full h-full'
                                            sizes="(max-width: 1279px) 160px, 64px"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1 p-3'>
                                        <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>{manga.type}</span>
                                        <h5 className='text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>{manga.title}</h5>
                                        <span className='text-xs text-gray-600 dark:text-gray-400'>{manga.latestChapter}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
} 