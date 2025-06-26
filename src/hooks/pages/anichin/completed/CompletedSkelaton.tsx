import React from 'react'

export default function MangaSkeleton() {
    return (
        <section className='py-16'>
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

                {/* Recommendations Section */}
                <div className="mb-8 md:mb-12 mt-12 md:mt-16">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6 md:mb-8"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
                                <div className="relative w-full aspect-[3/4] bg-gray-200 animate-pulse"></div>
                                <div className="p-3 md:p-4">
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="space-y-2">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
} 