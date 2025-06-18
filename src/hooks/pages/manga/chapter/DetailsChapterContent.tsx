"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { Card } from 'flowbite-react'

import { BookOpen } from 'lucide-react'

import { formatSlug } from '@/base/helper/FormatSlugManga'

import { DetailsChapterContentProps } from './types/ChapterDetails'

export default function DetailsChapterContent({ mangaData }: DetailsChapterContentProps) {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const handleImageLoad = (imageId: string) => {
        setLoadedImages(prev => new Set(prev).add(imageId));
    };

    const isRTL = mangaData.readingDirection === "Kanan ke Kiri";

    return (
        <section className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'>
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    <div className="lg:w-1/3">
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={mangaData.poster}
                                alt={mangaData.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="lg:w-2/3 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                                Chapter {mangaData.chapterNumber}
                            </span>
                            <span className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                                {mangaData.releasedOn}
                            </span>
                            <span className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium">
                                {mangaData.readingDirection}
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {mangaData.title}
                        </h1>
                        <div className="prose dark:prose-invert max-w-none">
                            {mangaData.synopsis.paragraphs.map((paragraph, index) => (
                                <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chapter Images Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-0 shadow-xl">
                    <h2 className="text-2xl p-8 font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Chapter Images
                    </h2>

                    <div className={`flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
                        {mangaData.chapterImages.map((image) => (
                            <div key={image.id} className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                                <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                    Chapter: {image.id}
                                </div>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    className={`object-contain w-full h-full ${loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    width={1080}
                                    quality={100}
                                    height={1080}
                                    onLoad={() => handleImageLoad(image.id)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (target.src !== image.fallbackSrc) {
                                            target.src = image.fallbackSrc;
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rekomdendasi Chapter */}
                <div className='mt-16'>
                    <div className='flex mb-12 flex-col gap-4'>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                            <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Recommended Chapters
                        </h2>
                        <p className='text-gray-600 dark:text-gray-400 mt-3 text-lg'>Discover more chapters you might enjoy</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                        {mangaData.recommendedChapters.map((chapter) => (
                            <Link
                                key={chapter.mangaId}
                                href={`/manga/${formatSlug(chapter.href)}`}
                                className="group"
                            >
                                <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer p-0 border-0">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                        <Image
                                            src={chapter.poster}
                                            alt={chapter.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center gap-3 text-sm text-gray-200">
                                                <span className="flex items-center gap-1.5">
                                                    <BookOpen className="w-4 h-4" />
                                                    {chapter.updateStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-4">
                                        <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                            {chapter.title}
                                        </h5>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {chapter.updateStatus}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
} 