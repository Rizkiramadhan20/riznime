"use client"

import React, { useState, useEffect, useCallback } from 'react'

import ReactDOM from 'react-dom/client'

import { OngoingMangaResponse } from './types/ongoing'

import Link from 'next/link'

import { Card } from 'flowbite-react'

import { BookOpen, Eye } from 'lucide-react'

import Image from 'next/image'

import { formatSlug } from "@/base/helper/FormatSlug"

import { useRouter } from 'next/navigation'

import LoadingOverlay from '@/base/helper/LoadingOverlay'

import ImagePlaceholder from '@/base/helper/ImagePlaceholder'

import Pagination from '@/base/helper/Pagination'

import { fetchMangaOngoingData } from '@/lib/FetchManga'

interface MangaContentProps {
    mangaData: OngoingMangaResponse;
}

export default function OngoingMangaContent({ mangaData }: MangaContentProps) {
    const router = useRouter();
    const [mangaList, setMangaList] = useState(mangaData.data.komikuList);
    const [pagination, setPagination] = useState(mangaData.pagination);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(mangaData.pagination.currentPage);

    // Function to get URL parameters
    const getUrlParams = () => {
        if (typeof window === 'undefined') return new URLSearchParams();
        return new URLSearchParams(window.location.search);
    };

    // Calculate total pages based on current page and hasNextPage
    const totalPages = pagination.hasNextPage ? currentPage + 1 : currentPage;

    const handleMangaClick = (e: React.MouseEvent<HTMLAnchorElement>, mangaId: string) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(`/manga/${formatSlug(mangaId)}`);
    };

    const handlePageChange = useCallback(async (page: number) => {
        if (page === currentPage) return;

        setIsPageLoading(true);
        try {
            const newData = await fetchMangaOngoingData(page);
            setMangaList(newData.data.komikuList);
            setPagination(newData.pagination);
            setCurrentPage(page);

            // Update URL with new page
            router.push(`/manga/ongoing?page=${page}`);
        } catch (error) {
            console.error('Error fetching page data:', error);
        } finally {
            setIsPageLoading(false);
        }
    }, [currentPage, router]);

    // Update data when component mounts with different page
    useEffect(() => {
        const urlParams = getUrlParams();
        const page = urlParams.get('page');
        if (page && parseInt(page) !== currentPage) {
            handlePageChange(parseInt(page));
        }
    }, [currentPage, handlePageChange]);

    return (
        <section className='py-12 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay isLoading={isLoading || isPageLoading} message="Loading content..." />
            <div className='container px-4'>
                <div className='flex mb-12 flex-col gap-4'>
                    <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Manga Ongoing</h3>
                    <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Jelajahi koleksi manga ongoing yang sedang tayang</p>
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
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                const placeholder = document.createElement('div');
                                                placeholder.style.width = '100%';
                                                placeholder.style.height = '100%';
                                                parent.appendChild(placeholder);
                                                const root = ReactDOM.createRoot(placeholder);
                                                root.render(<ImagePlaceholder />);
                                            }
                                        }}
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

                {/* Pagination */}
                {pagination && totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
