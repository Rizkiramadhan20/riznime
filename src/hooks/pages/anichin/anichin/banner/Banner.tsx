"use client"

import React, { useState, useCallback } from 'react'

import { AnichinData } from '@/types/anichin';

import Link from 'next/link';

import Image from 'next/image';

import { formatSlug } from "@/base/helper/FormatSlug"

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import ImagePlaceholder from '@/base/helper/ImagePlaceholder';

import { useRouter } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';

interface AnimeContentProps {
    anichinData: AnichinData;
}

export default function Banner({ anichinData }: AnimeContentProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

    const handleAnimeClick = (e: React.MouseEvent<HTMLAnchorElement>, animeId: string) => {
        e.preventDefault();
        setLoadingId(animeId);
        setLoadingProgress(0);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(`/donghua/${formatSlug(animeId)}`);
            }
        }, 100);
    };

    const handleImageError = (animeId: string) => {
        setImageError(prev => ({ ...prev, [animeId]: true }));
    };

    const goToPrevSlide = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? anichinData.update.animeList.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex === anichinData.update.animeList.length - 1 ? 0 : prevIndex + 1));
    }, [anichinData.update.animeList.length]);

    React.useEffect(() => {
        if (anichinData.update.animeList.length <= 1) return;
        const interval = setInterval(() => {
            goToNextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, anichinData.update.animeList.length, goToNextSlide]);

    const currentAnime = anichinData.update.animeList[activeIndex];
    const isImageError = imageError[currentAnime.animeId];

    return (
        <section className='pt-14 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            <div className='container px-4'>
                {/* Slider Section */}
                <div
                    className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 aspect-[21/9]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Link
                                href={`/donghua/${formatSlug(currentAnime.animeId)}`}
                                onClick={(e) => handleAnimeClick(e, currentAnime.animeId)}
                                className="block relative w-full h-full"
                            >
                                <div className='relative w-full h-full'>
                                    {isImageError ? (
                                        <ImagePlaceholder className="object-cover" />
                                    ) : (
                                        <Image
                                            src={currentAnime.poster}
                                            alt={currentAnime.title}
                                            fill
                                            quality={90}
                                            priority={activeIndex === 0}
                                            className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                            onError={() => handleImageError(currentAnime.animeId)}
                                        />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                                {/* Content Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="absolute bottom-12 left-0 right-0 p-6 md:p-8 text-white z-10"
                                >
                                    <div className='flex flex-col gap-3 md:gap-4 max-w-4xl'>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg tracking-tight"
                                        >
                                            {currentAnime.title}
                                        </motion.h2>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                            className="flex items-center gap-3 text-sm text-gray-200"
                                        >
                                            <span>
                                                {currentAnime.synopsis}
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {anichinData.update.animeList.length > 1 && (
                        <>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={goToPrevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-lg z-20 transition-all duration-300 focus:outline-none backdrop-blur-sm"
                                aria-label="Previous slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={goToNextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-lg z-20 transition-all duration-300 focus:outline-none backdrop-blur-sm"
                                aria-label="Next slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </>
                    )}

                    {/* Dots Navigation */}
                    {anichinData.update.animeList.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-20">
                            <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                                {anichinData.update.animeList.map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <button
                                            onClick={() => setActiveIndex(index)}
                                            className="h-2 w-8 mx-0.5 rounded-full overflow-hidden bg-white/20"
                                            aria-label={`Go to slide ${index + 1}`}
                                        >
                                            <div className="h-full w-full relative">
                                                <motion.div
                                                    className="absolute inset-0 bg-white"
                                                    initial={false}
                                                    animate={{
                                                        scaleX: index === activeIndex ? 1 : 0,
                                                        transformOrigin: "left"
                                                    }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                />
                                            </div>
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
