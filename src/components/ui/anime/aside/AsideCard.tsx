import React, { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { formatSlug } from '@/base/helper/FormatSlug'

import Image from 'next/image'

import { Star } from 'lucide-react'

import LoadingOverlay from '@/base/helper/LoadingOverlay'

interface AnimeData {
    completed: {
        animeList: {
            href: string;
            title: string;
            episodes: number;
            score: number;
            latestReleaseDate: string;
            poster: string;
        }[];
    };
}

export default function AsideCard({ animeData }: { animeData: AnimeData }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const handleAnimeClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
                router.push(`/anime/${formatSlug(href)}`);
            }
        }, 100);
    };

    return (
        <aside className='w-full xl:w-1/4'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading in progress"
                progress={loadingProgress}
            />
            <div className='sticky top-5'>
                <div className='flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg min-h-[400px] max-h-[250px] sm:min-h-[500px] sm:max-h-[800px] overflow-y-auto'>
                    <div className='flex justify-between items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4'>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Completed</h3>

                        <Link href={"/completed"} className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium'>
                            Lihat Semua
                        </Link>
                    </div>

                    <div className='flex flex-row xl:flex-col gap-4 sm:gap-6 overflow-x-auto xl:overflow-x-visible pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent px-2 sm:px-0'>
                        {
                            animeData.completed.animeList.map((Item, idx) => {
                                return (
                                    <Link
                                        href={`/anime/${formatSlug(Item.href)}`}
                                        key={idx}
                                        rel=''
                                        className='w-40 sm:w-44 xl:w-auto min-w-[160px] sm:min-w-[176px] xl:min-w-0 group flex-shrink-0 xl:flex-shrink'
                                        onClick={(e) => handleAnimeClick(e, Item.href)}
                                    >
                                        <div className='flex flex-col xl:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-200'>
                                            <div className='relative w-full aspect-[3/4] xl:w-28 xl:aspect-[3/4] flex-shrink-0'>
                                                <Image
                                                    src={Item.poster}
                                                    alt={Item.title}
                                                    fill
                                                    className='object-cover w-full h-full'
                                                    sizes="(max-width: 1279px) 160px, 64px"
                                                />
                                            </div>
                                            <div className='flex flex-col gap-1 p-3'>
                                                {/* Genre/Type info jika ada, contoh: */}
                                                {/* <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Action, Adventure</span> */}
                                                <h5 className='text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>{Item.title}</h5>
                                                <span className='text-xs text-gray-600 dark:text-gray-400'>{Item.episodes} eps</span>
                                                <span className='text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5'>
                                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                    {Item.score} (score)
                                                </span>
                                                <span className='text-xs text-gray-600 dark:text-gray-400'>{Item.latestReleaseDate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </aside>
    )
}
