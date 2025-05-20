import React from 'react'

export default function DetailsAnimeSkeleton() {
    return (
        <section className='py-6 md:py-10'>
            <div className="container px-4">
                {/* Hero Section Skeleton */}
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-32 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Poster and Info */}
                    <div className="col-span-1">
                        <div className="relative aspect-[3/4] w-full max-w-[430px] md:max-w-[500px] mx-auto rounded-xl overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        </div>
                        <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-md">
                            <div className="space-y-4">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="grid grid-cols-2 gap-3 md:gap-4">
                                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Synopsis Skeleton */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Genres Skeleton */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="flex flex-wrap gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Episodes Skeleton */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center bg-gray-200 rounded-xl p-3">
                                        <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                                        <div className="ml-3 flex-1">
                                            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                                            <div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Anime Skeleton */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 md:p-6 shadow-md">
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"></div>
                                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 