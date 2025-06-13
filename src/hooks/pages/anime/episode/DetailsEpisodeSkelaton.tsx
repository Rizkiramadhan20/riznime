import React from 'react'

export default function DetailsEpisodeSkeleton() {
    return (
        <section className='py-8 md:py-12'>
            <div className="container px-4">
                {/* Hero Section with Poster */}
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-12">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                        <div className="h-10 w-3/4 bg-gray-300 rounded-lg animate-pulse mb-3"></div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="h-8 w-24 bg-gray-300 rounded-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Streaming Section */}
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm md:w-[65%]">
                        <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>

                        {/* Download Section */}
                        <div className="mt-8">
                            <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-200 rounded-xl animate-pulse">
                                        <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
                                        <div className="flex-1">
                                            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-3 w-32 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Episodes List */}
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm md:w-[35%]">
                        <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
                        <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-200 rounded-xl animate-pulse">
                                    <div className="w-14 h-14 bg-gray-300 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-3 w-32 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-8 md:mt-12">
                    <div className="col-span-1">
                        <div className="relative aspect-[3/4] w-full max-w-[430px] md:max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        </div>
                        <div className="mt-8 bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {[...Array(5)].map((_, index) => (
                                    <React.Fragment key={index}>
                                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recommended Anime Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                            <div className="h-8 w-48 bg-gray-300 rounded-lg animate-pulse mb-6"></div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
                                        <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>
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