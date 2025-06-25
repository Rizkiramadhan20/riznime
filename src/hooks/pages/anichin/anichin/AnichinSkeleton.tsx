"use client"

import React from 'react';

export default function AnichinSkeleton() {
    return (
        <>
            <section className='pt-14 bg-gray-50 dark:bg-gray-900'>
                <div className='container px-4'>
                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 aspect-[21/9] bg-gray-200 dark:bg-gray-800 animate-pulse">
                        {/* Content Overlay */}
                        <div className="absolute bottom-12 left-0 right-0 p-6 md:p-8 z-10">
                            <div className='flex flex-col gap-3 md:gap-4 max-w-4xl'>
                                {/* Title Skeleton */}
                                <div className="h-8 md:h-12 lg:h-14 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

                                {/* Synopsis Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Dots Skeleton */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-20">
                            <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                                {[1, 2, 3].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-2 w-8 mx-0.5 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className='py-10 bg-gray-50 dark:bg-gray-900'>
                <div className='container px-4'>
                    <div className='flex justify-between sm:items-center mb-12 flex-col sm:flex-row items-start gap-6'>
                        <div>
                            <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-6 w-80 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-3"></div>
                        </div>
                        <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className='flex gap-8 flex-col xl:flex-row'>
                        <article className='w-full xl:w-3/4'>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
                                {[...Array(12)].map((_, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                                        <div className="relative aspect-[3/4] w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                                        <div className="p-4">
                                            <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <aside className='w-full xl:w-1/4'>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="w-20 h-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Ongoing */}
            <section className='py-10 bg-gray-50 dark:bg-gray-900'>
                <div className='container px-4'>
                    <div className='flex justify-between sm:items-center mb-12 flex-col sm:flex-row items-start gap-6'>
                        <div>
                            <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-6 w-80 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-3"></div>
                        </div>
                        <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className='flex gap-8'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
                            {[...Array(10)].map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-full">
                                    <div className="relative aspect-[3/4] w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                                    <div className="p-4">
                                        <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
} 