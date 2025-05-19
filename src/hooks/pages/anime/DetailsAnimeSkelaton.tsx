import React from 'react'

export default function DetailsAnimeSkeleton() {
    return (
        <section className='min-h-screen py-20'>
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
                {/* Hero Section with Parallax Effect Skeleton */}
                <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
                            {/* Anime Poster Skeleton */}
                            <div className="w-32 sm:w-40 md:w-48 lg:w-56 flex-shrink-0">
                                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-gray-200 animate-pulse"></div>
                            </div>

                            {/* Title Section Skeleton */}
                            <div className="flex-1">
                                <div className="h-10 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                                <div className="h-6 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-4 w-2/3 bg-gray-200 rounded-lg animate-pulse mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content Skeleton */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Synopsis Skeleton */}
                            <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Episodes Skeleton */}
                            <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Related Anime Skeleton */}
                            <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-card-border shadow-lg">
                                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar Skeleton */}
                        <div className="lg:relative">
                            <div className="lg:sticky lg:top-24 space-y-8">
                                {/* Info Card Skeleton */}
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
                                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                    <div className="space-y-5">
                                        {[...Array(9)].map((_, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                                <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Genres Skeleton */}
                                <div className="bg-card-bg/50 backdrop-blur-sm rounded-2xl p-6 border border-card-border shadow-lg">
                                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                                    <div className="flex flex-wrap gap-2">
                                        {[...Array(6)].map((_, index) => (
                                            <div key={index} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 