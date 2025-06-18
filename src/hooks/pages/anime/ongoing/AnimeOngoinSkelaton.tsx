import React from 'react';

export default function AnimeContentSkeleton() {
    return (
        <section className='py-16 bg-gray-50 dark:bg-gray-900'>
            <div className='container px-4 mx-auto max-w-7xl'>
                <div className='flex justify-between sm:items-center mb-12 flex-col sm:flex-row items-start gap-6'>
                    <div>
                        <div className='h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse'></div>
                        <div className='h-6 w-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mt-3'></div>
                    </div>
                    <div className='h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse'></div>
                </div>
                <div className='flex gap-8 flex-col xl:flex-row'>
                    <article className='w-full xl:w-3/4'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
                            {[...Array(8)].map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                                    <div className="relative aspect-[3/4] w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <aside className='w-full xl:w-1/4'>
                        <div className='sticky top-24'>
                            <div className='flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg min-h-[400px] max-h-[250px] sm:min-h-[500px] sm:max-h-[800px]'>
                                <div className='flex justify-between items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4'>
                                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>

                                <div className='flex flex-row xl:flex-col gap-4 sm:gap-6 overflow-x-auto xl:overflow-x-visible pb-2'>
                                    {[...Array(4)].map((_, idx) => (
                                        <div key={idx} className='w-40 sm:w-44 xl:w-auto min-w-[160px] sm:min-w-[176px] xl:min-w-0 flex-shrink-0 xl:flex-shrink'>
                                            <div className='flex flex-col xl:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full'>
                                                <div className='relative w-full aspect-[3/4] xl:w-28 xl:aspect-[3/4] flex-shrink-0 bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
                                                <div className='flex flex-col gap-1 p-3'>
                                                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
} 