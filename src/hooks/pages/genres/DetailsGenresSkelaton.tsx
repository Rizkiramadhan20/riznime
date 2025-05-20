import React from 'react'

export default function DetailsGenresSkeleton() {
    return (
        <section className='py-8'>
            <div className="container px-4">
                {/* Slider Section */}
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
                    {[...Array(12)].map((_, index) => (
                        <div key={index} className="space-y-3">
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Pagination Section */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        </section>
    )
} 