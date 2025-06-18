"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Anime } from '@/types/anime'
import LoadingOverlay from '@/base/helper/LoadingOverlay'
import { useRouter } from 'next/navigation'
import { formatSlug } from '@/base/helper/FormatSlug'

import ModalPreview from '../modal/ModalPreview'

type Props = {
    anime: Anime;
}

export default function AnimeCard({ anime }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        const slug = formatSlug(anime.href);
        router.push(`/anime/${slug}`);
    };

    return (
        <>
            <LoadingOverlay isLoading={isNavigating} message="Loading anime page..." />
            <div className="group relative">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{anime.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-200">
                            <span>{anime.episodes || 'N/A'} Episodes</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span>{anime.score || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                            title="Quick Preview"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <Link
                            href={`/anime/${formatSlug(anime.href)}`}
                            onClick={handleNavigation}
                            className="p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                            title="Go to Anime"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <ModalPreview
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                anime={anime}
            />
        </>
    )
} 