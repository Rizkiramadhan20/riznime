"use client"
import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import ModalPreview from '../modal/ModalPreview'

import { Anime } from '@/types/anime'

type Props = {
    anime: Anime;
}

export default function AnimeCard({ anime }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <>
            <div className="group relative">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                title="View Details"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <Link
                                href={`/anime/${anime.animeId}`}
                                className="p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                title="Go to Anime"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                {anime.title}
                            </h3>
                            {anime.synopsis?.paragraphs && anime.synopsis.paragraphs.length > 0 && (
                                <p className="text-white/70 text-xs mt-2 line-clamp-2 group-hover:line-clamp-2 transition-all duration-300">
                                    {anime.synopsis.paragraphs[0]}
                                </p>
                            )}
                            <div className="flex flex-col gap-1 mt-2">
                                {anime.score && (
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="w-3 h-3 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-yellow-400 text-xs font-medium">
                                            {anime.score}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-white/60 text-xs">
                                    {anime.episodes && (
                                        <span>{anime.episodes} eps</span>
                                    )}
                                    <span>•</span>
                                    <span>{anime.season || "N/A"}</span>
                                </div>
                                {anime.genreList && anime.genreList.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {anime.genreList.slice(0, 2).map((genre) => (
                                            <span key={genre.genreId} className="text-white/60 text-xs">
                                                {genre.title}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalPreview
                anime={anime}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
} 