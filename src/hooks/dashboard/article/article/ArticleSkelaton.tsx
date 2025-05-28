import React from 'react'

export default function ArticleSkeleton() {
    return (
        <section className="min-h-full">
            {/* Header Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex justify-between items-center">
                <div className='flex flex-col gap-1.5'>
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                </div>
                <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>

            {/* Filter Controls Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <div className="relative">
                            <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="h-12 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-12 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-[var(--card-bg)] rounded-xl shadow-md border border-[var(--border-color)] overflow-hidden">
                        <div className="h-48 sm:h-56 bg-gray-200 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="p-3 sm:p-5">
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-lg mb-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}