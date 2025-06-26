"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GenreAnichin } from '@/interface/anichin'
import LoadingOverlay from '@/base/helper/LoadingOverlay'
import ImagePlaceholder from '@/base/helper/ImagePlaceholder'
import { useRouter } from 'next/navigation'
import { formatSlug } from '@/base/helper/FormatSlugAnichin'

type Props = {
    donghua: GenreAnichin;
}

export default function AnichinCard({ donghua }: Props) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        const href = `/donghua/${formatSlug(donghua.href)}`;
        router.push(href);
    };

    return (
        <>
            <LoadingOverlay isLoading={isNavigating} message="Loading donghua page..." />
            <Link href={`/donghua/${formatSlug(donghua.href)}`} className="group relative" onClick={handleNavigation}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imageError ? (
                        <ImagePlaceholder className="w-full h-full" />
                    ) : (
                        <Image
                            src={donghua.poster}
                            alt={donghua.title}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-2 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm text-white rounded-md">
                            {donghua.type || 'N/A'}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{donghua.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-200">
                            <span className="px-2 py-1 text-xs font-medium bg-red-600/80 backdrop-blur-sm text-white rounded-md">
                                {donghua.episode || 'N/A'}
                            </span>
                            <span className="text-xs font-medium">
                                {donghua.quality || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
} 