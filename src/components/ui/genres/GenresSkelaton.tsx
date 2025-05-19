'use client';

import React from 'react';

export default function BannerSkeleton() {
    return (
        <div className="relative w-full h-[80vh] sm:h-[100vh]">
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content Skeleton */}
            <div className="relative z-10 flex flex-col justify-center h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 sm:space-y-8 max-w-3xl">
                    {/* Metadata Tags Skeleton */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse"></div>
                        <div className="h-6 w-32 bg-white/10 rounded-full animate-pulse"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-3/4 bg-white/10 rounded-lg animate-pulse"></div>

                    {/* CTA Button Skeleton */}
                    <div className="h-12 w-32 bg-white/10 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
} 