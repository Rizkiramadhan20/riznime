"use client"
import React, { useState, useRef } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import LoadingOverlay from '@/base/helper/LoadingOverlay'

import { Card } from 'flowbite-react'

import { BookOpen, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

import ImagePlaceholder from '@/base/helper/ImagePlaceholder'

import ReactDOM from 'react-dom/client'

import { useRouter } from 'next/navigation'

interface MangaData {
    manhua_popular: {
        mangaList: Array<{
            title: string
            poster: string
            mangaId: string
            href: string
            type: string
            views: string
            latestChapter: string
            latestChapterUrl: string
        }>
    }
}

export default function ManhuaContent({ mangaData }: { mangaData: MangaData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(e.currentTarget.href);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (sliderRef.current) {
            setStartX(e.pageX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (sliderRef.current) {
            const x = e.pageX - sliderRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            sliderRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (sliderRef.current) {
            setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (sliderRef.current) {
            const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            sliderRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 400; // Adjust this value based on your needs
            const newScrollLeft = direction === 'left'
                ? sliderRef.current.scrollLeft - scrollAmount
                : sliderRef.current.scrollLeft + scrollAmount;

            sliderRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className='py-10'>
            <LoadingOverlay isLoading={isLoading} message="Loading content..." />
            <div className="container px-4 flex flex-col gap-6 md:gap-8">
                <div className='flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                    <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>Manhua Popular</h3>
                </div>

                {/* Horizontal Manga List */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => handleScroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Gradient Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={sliderRef}
                        className="w-full overflow-x-auto touch-pan-x cursor-grab active:cursor-grabbing select-none scrollbar-hide pb-4"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehaviorX: 'contain',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        } as React.CSSProperties}
                    >
                        <div className="flex gap-3 sm:gap-4">
                            {mangaData.manhua_popular.mangaList.map((manga, idx) => (
                                <div
                                    key={manga.mangaId}
                                    className="flex-none group touch-pan-y"
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    <Link
                                        href={`manga/${manga.href}`}
                                        className="block w-[160px] sm:w-[200px] lg:w-[240px]"
                                        onClick={handleLinkClick}
                                    >
                                        <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer p-0 border-0">
                                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                                {manga.poster ? (
                                                    <Image
                                                        src={manga.poster}
                                                        alt={manga.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                                                        priority={idx < 6}
                                                        onError={(e) => {
                                                            const imgElement = e.target as HTMLImageElement;
                                                            imgElement.style.display = 'none';
                                                            const parent = imgElement.parentElement;
                                                            if (parent) {
                                                                const placeholder = document.createElement('div');
                                                                placeholder.style.width = '100%';
                                                                placeholder.style.height = '100%';
                                                                parent.appendChild(placeholder);
                                                                const root = ReactDOM.createRoot(placeholder);
                                                                root.render(<ImagePlaceholder />);
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <ImagePlaceholder />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                                        <span className="flex items-center gap-1.5">
                                                            <BookOpen className="w-4 h-4" />
                                                            {manga.latestChapter}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                                        <span className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
                                                            {manga.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 p-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Eye className="w-4 h-4" />
                                                    {manga.views}
                                                </span>
                                                <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                                    {manga.title}
                                                </h5>
                                            </div>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
