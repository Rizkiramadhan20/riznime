import React from 'react'

import { Card } from 'flowbite-react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MangaSkeleton() {
    return (
        <>
            {/* Home Section */}
            <section className='py-12'>
                <div className="container px-4 mx-auto">
                    {/* Banner Section */}
                    <div className="bg-header-bg rounded-3xl border border-[var(--card-border)] mb-8 md:mb-16 flex flex-col md:flex-row items-center overflow-hidden relative">
                        <div className="flex-1 p-6 md:p-12 z-10">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="h-12 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                            <div className="h-6 w-1/2 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                        <div className="flex-1 min-h-[250px] sm:min-h-[350px] md:min-h-[500px] w-full md:w-1/2 bg-gray-200 animate-pulse"></div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                        {/* Main Content */}
                        <article className="flex-1">
                            <div className='flex flex-col gap-6 md:gap-8 bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl'>
                                <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                                    <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
                                            <div className="relative w-full aspect-[3/4] bg-gray-200 animate-pulse"></div>
                                            <div className="flex flex-col gap-2 p-3 md:p-4">
                                                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <div className="w-full md:w-80">
                            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-xl">
                                <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="w-16 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Section */}
                    <div className='mb-8 md:mb-12 mt-12 md:mt-16'>
                        <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6 mb-6 md:mb-8'>
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
                                    <div className="relative w-full aspect-[3/4] bg-gray-200 animate-pulse"></div>
                                    <div className="flex flex-col gap-2 p-3 md:p-4">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 md:mt-8 flex justify-center gap-2">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Genres */}
            <section className='mb-10 md:mb-20'>
                <div className='container px-4 flex flex-col gap-6 md:gap-8'>
                    <div className='flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>

                    <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {[...Array(20)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col items-center gap-2 p-2">
                                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </article>
                </div>
            </section>

            {/* Manhua Section */}
            <section>
                <div className='container px-4 flex flex-col gap-6 md:gap-8'>
                    <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                        <div className='h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse'></div>
                        <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse'></div>
                    </div>

                    <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {[...Array(10)].map((_, idx) => (
                            <Card key={idx} className="h-full bg-white dark:bg-gray-800 p-0 border-0">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                <div className="flex flex-col gap-2 p-4">
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </Card>
                        ))}
                    </article>
                </div>
            </section>

            {/* Manhwa Section */}
            <section className='py-10'>
                <div className="container px-4 flex flex-col gap-6 md:gap-8">
                    <div className='flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                        <div className='h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                    </div>

                    {/* Horizontal Manga List */}
                    <div className="relative">
                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>

                        {/* Gradient Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

                        <div className="w-full overflow-x-auto scrollbar-hide pb-4">
                            <div className="flex gap-3 sm:gap-4">
                                {[...Array(6)].map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-none"
                                    >
                                        <div className="w-[160px] sm:w-[200px] lg:w-[240px]">
                                            <Card className="h-full bg-white dark:bg-gray-800 p-0 border-0">
                                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                                </div>
                                                <div className="flex flex-col gap-2 p-4">
                                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Completed Section */}
            <section className='py-10'>
                <div className="container px-4 flex flex-col gap-6 md:gap-8">
                    <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    <div className="relative">
                        <div className="w-full overflow-x-auto pb-4">
                            <div className="flex gap-3 sm:gap-4">
                                {[...Array(6)].map((_, idx) => (
                                    <div key={idx} className="flex-none">
                                        <div className="w-[200px] sm:w-[240px] lg:w-[300px]">
                                            <div className="h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                                                <div className="relative aspect-[3/4] w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                                <div className="p-4 space-y-3">
                                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
} 