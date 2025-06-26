import React from 'react';

export default function DetailsGenresSkelaton() {
    return (
        <section className='py-8'>
            <div className="container px-4">
                {/* Slider Skeleton */}
                <div className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 aspect-[21/9] bg-gray-200 dark:bg-gray-800 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className='flex flex-col gap-3 md:gap-4 max-w-4xl'>
                            <div className="h-8 md:h-12 lg:h-14 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="flex gap-4">
                                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            </div>
                            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-2"></div>
                        </div>
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="group relative">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        </section>
    );
} 