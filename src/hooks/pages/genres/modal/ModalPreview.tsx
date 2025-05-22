import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { Anime } from '@/types/anime'

type Props = {
    anime: Anime;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalPreview({ anime, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="border-b border-border p-4 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-medium text-text">{anime.title}</h3>
                            <p className="text-sm text-text-secondary">ID: {anime.animeId}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="p-0 overflow-hidden bg-card-bg border border-card-border rounded-lg shadow-card-shadow">
                                <div className="relative w-full aspect-[3/4]">
                                    <Image
                                        src={anime.poster}
                                        alt={anime.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {anime.genreList && anime.genreList.length > 0 && (
                                <div className="mt-6 p-4 bg-card-bg border border-card-border rounded-lg shadow-card-shadow">
                                    <h5 className="text-lg font-bold tracking-tight text-text mb-4">
                                        Genres
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.genreList.map((genre) => (
                                            <Link
                                                key={genre.genreId}
                                                href={genre.href}
                                                className="inline-block"
                                            >
                                                <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {genre.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {anime.synopsis?.paragraphs && anime.synopsis.paragraphs.length > 0 && (
                                <div className="p-4 bg-card-bg border border-card-border rounded-lg shadow-card-shadow">
                                    <h5 className="text-lg font-bold tracking-tight text-text mb-4">
                                        Synopsis
                                    </h5>
                                    <div className="space-y-3">
                                        {anime.synopsis.paragraphs.map((paragraph, index) => (
                                            <p key={index} className="text-sm text-text-secondary leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-card-bg border border-card-border rounded-lg shadow-card-shadow">
                                <h5 className="text-lg font-bold tracking-tight text-text mb-4">
                                    Details
                                </h5>
                                <div className="space-y-3">
                                    {anime.studios && (
                                        <p className="text-sm text-text-secondary">
                                            <span className="font-medium">Studio:</span> {anime.studios}
                                        </p>
                                    )}
                                    {anime.score && (
                                        <p className="text-sm text-text-secondary">
                                            <span className="font-medium">Score:</span> {anime.score}
                                        </p>
                                    )}
                                    {anime.episodes && (
                                        <p className="text-sm text-text-secondary">
                                            <span className="font-medium">Episodes:</span> {anime.episodes}
                                        </p>
                                    )}
                                    {anime.season && (
                                        <p className="text-sm text-text-secondary">
                                            <span className="font-medium">Season:</span> {anime.season}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 