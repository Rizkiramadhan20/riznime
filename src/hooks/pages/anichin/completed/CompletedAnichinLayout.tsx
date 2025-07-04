"use client"

import React from 'react'

import ReactDOM from 'react-dom/client';

import Link from 'next/link';

import { Card } from 'flowbite-react';

import { BookOpen } from 'lucide-react';

import Image from 'next/image';

import Pagination from '@/base/helper/Pagination';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import ImagePlaceholder from '@/base/helper/ImagePlaceholder';

import { DonghuaContentProps } from "@/interface/anichin"

import { useManagementCompletedAnichin } from '@/hooks/pages/anichin/completed/utils/useManagementCompletedAnichin';

export default function CompletedDonghuaLayout({ anichinData }: DonghuaContentProps) {
    const {
        currentPage,
        donghuaList,
        loadingId,
        loadingProgress,
        totalPages,
        handlePageChange,
        handleDonghuaClick,
    } = useManagementCompletedAnichin({ anichinData });

    return (
        <section className='py-16 z-50'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message={`Loading in progress`}
                progress={loadingProgress}
            />
            <div className='container px-4'>
                <div className='flex mb-12 flex-col gap-2'>
                    <h3 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>Completed Donghua</h3>
                    <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Explore our collection of completed donghua</p>
                </div>

                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {
                        donghuaList.map((item, idx) => {
                            return (
                                <Link
                                    href={`/donghua/${item.anichinId}`}
                                    key={idx}
                                    onClick={(e) => handleDonghuaClick(e, item.anichinId)}
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
                                                        {item.type}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
                                                        {item.episode}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute top-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                                    <span className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
                                                        {item.quality}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 p-4">
                                            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                                                {item.title}
                                            </h5>
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
