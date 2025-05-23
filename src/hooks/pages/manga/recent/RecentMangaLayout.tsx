"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { RecentMangaResponse } from './types/recent'

import Link from 'next/link'

import { Card } from 'flowbite-react'

import { BookOpen, Eye } from 'lucide-react'

import Image from 'next/image'

import { formatSlug } from "@/base/helper/FormatSlug"

import Pagination from '@/base/helper/Pagination'

import { useRouter, useSearchParams } from 'next/navigation'

import LoadingOverlay from '@/base/helper/LoadingOverlay'

interface MangaContentProps {
    mangaData: RecentMangaResponse;
}

export default function RecentMangaContent({ mangaData }: MangaContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [mangaList, setMangaList] = useState(mangaData.data.animeList);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const MAX_PAGE = 300;

    const handlePageChange = useCallback(async (page: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/manga/recent?page=${page}`, {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
                },
            });
            const data: RecentMangaResponse = await response.json();

            if (data.data.animeList && data.data.animeList.length > 0) {
                setMangaList(data.data.animeList);
                setCurrentPage(page);
                router.push(`/manga/recent?page=${page}`);

                if (page >= MAX_PAGE) {
                    setHasMorePages(false);
                } else {
                    setHasMorePages(true);
                }
            } else {
                setHasMorePages(false);
            }
        } catch (error) {
            console.error('Failed to fetch manga data:', error);
            setHasMorePages(false);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const page = searchParams.get('page');
        if (page) {
            const pageNumber = parseInt(page);
            handlePageChange(pageNumber);
        }
    }, [searchParams, handlePageChange]);

    const handleMangaClick = (e: React.MouseEvent<HTMLAnchorElement>, mangaId: string) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(`/manga/${formatSlug(mangaId)}`);
    };

    return (
        <section className='py-12 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay isLoading={isLoading} message="Loading content..." />
            <div className='container px-4'>
                <div className='flex mb-12 flex-col gap-4'>
                    <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Manga Terbaru</h3>
                    <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Jelajahi koleksi manga terbaru yang sedang tayang</p>
                </div>

                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
                    {mangaList.map((item, idx) => (
                        <Link
                            href={`/manga/${formatSlug(item.mangaId)}`}
                            key={idx}
                            onClick={(e) => handleMangaClick(e, item.mangaId)}
                        >
                            <Card className="group h-full bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer p-0 border-0">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                    <Image
                                        src={item.poster}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        priority={idx < 6}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center gap-3 text-sm text-gray-200">
                                            <span className="flex items-center gap-1.5">
                                                <BookOpen className="w-4 h-4" />
                                                {item.latestChapter}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 p-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-4 h-4" />
                                            {item.views.split('•')[0].trim()}
                                        </span>
                                    </div>

                                    <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                        {item.title}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {item.views.split('•')[1]?.trim()}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </article>

                {hasMorePages && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={MAX_PAGE}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
