"use client"

import React, { useState, useEffect, useCallback } from 'react'

import ReactDOM from 'react-dom/client';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { Eye, BookOpen } from 'lucide-react';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

import Pagination from '@/base/helper/Pagination';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import ImagePlaceholder from '@/base/helper/ImagePlaceholder';

import { fetchMangaPopularData } from '@/lib/FetchManga';

interface Manga {
    title: string;
    poster: string;
    type: string;
    mangaId: string;
    href: string;
    komikuUrl: string;
    views: string;
    description: string;
    firstChapter: string;
    latestChapter: string;
    firstChapterUrl: string;
    latestChapterUrl: string;
    upCount: number;
}

interface MangaContentProps {
    mangaData: {
        data: {
            animeList: Manga[];
        };
        pagination: {
            currentPage: number;
            hasNextPage: boolean;
            nextPage: number;
            prevPage: number;
        };
    };
}

export default function MangaContent({ mangaData }: MangaContentProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(mangaData.pagination.currentPage);
    const [mangaList, setMangaList] = useState(mangaData.data.animeList);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [totalPages, setTotalPages] = useState(mangaData.pagination.nextPage);

    // Function to get URL parameters
    const getUrlParams = () => {
        if (typeof window === 'undefined') return new URLSearchParams();
        return new URLSearchParams(window.location.search);
    };

    const handlePageChange = useCallback(async (page: number) => {
        try {
            setLoadingProgress(0);
            router.push(`/manga/popular?page=${page}`);

            const data = await fetchMangaPopularData(page);
            setMangaList(data.data.animeList);
            setCurrentPage(data.pagination.currentPage);
            setTotalPages(data.pagination.nextPage);
            setLoadingProgress(100);
            setTimeout(() => {
                setLoadingProgress(0);
            }, 500);
        } catch (error) {
            console.error('Failed to fetch manga data:', error);
            setLoadingProgress(0);
        }
    }, [router]);

    useEffect(() => {
        const urlParams = getUrlParams();
        const page = urlParams.get('page');
        if (page && parseInt(page) !== currentPage) {
            handlePageChange(parseInt(page));
        }
    }, [currentPage, handlePageChange]);

    const handleMangaClick = (e: React.MouseEvent<HTMLAnchorElement>, mangaId: string) => {
        e.preventDefault();
        setLoadingId(mangaId);
        setLoadingProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(`/manga/${formatSlug(mangaId)}`);
            }
        }, 100);
    };

    return (
        <section className='py-10 bg-gray-50 dark:bg-gray-900 z-50'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message={`Loading in progress`}
                progress={loadingProgress}
            />
            <div className='container px-4'>
                <div className='flex mb-12 flex-col gap-2'>
                    <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Popular Manga</h3>
                    <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Explore our collection of popular manga series</p>
                </div>

                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {
                        mangaList.map((item, idx) => {
                            return (
                                <Link
                                    href={`/manga/${formatSlug(item.href)}`}
                                    key={idx}
                                    onClick={(e) => handleMangaClick(e, item.href)}
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
                                                    const imgElement = e.target as HTMLImageElement;
                                                    imgElement.style.display = 'none';
                                                    const parent = imgElement.parentElement;
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
                                                <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                                    <span className="flex items-center gap-1.5">
                                                        <BookOpen className="w-4 h-4" />
                                                        {item.latestChapter}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute top-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                                    <span className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
                                                        {item.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 p-4">
                                            <span className="flex items-center gap-1.5">
                                                <Eye className="w-4 h-4" />
                                                {item.views}
                                            </span>

                                            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                                                {item.title}
                                            </h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {item.description}
                                            </p>
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
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}
