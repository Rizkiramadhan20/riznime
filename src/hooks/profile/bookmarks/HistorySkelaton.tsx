import React from 'react'

export default function HistorySkelaton() {
    return (
        <section className="min-h-full">
            {/* Header Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                </div>
                <div className="h-10 w-56 bg-gray-200 animate-pulse rounded-lg mt-2 sm:mt-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>

            {/* History Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(9)].map((_, index) => (
                    <div key={index} className="bg-[var(--card-bg)] rounded-xl shadow-md p-4 flex flex-col gap-2 border border-[var(--border-color)]">
                        <div className="rounded-lg mb-2 aspect-[16/9] bg-gray-200 animate-pulse overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-1 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}