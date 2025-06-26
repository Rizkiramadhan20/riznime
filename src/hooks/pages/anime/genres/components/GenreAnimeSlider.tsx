"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Anime } from '@/interface/anime';
import LoadingOverlay from '@/base/helper/LoadingOverlay';
import { useRouter } from 'next/navigation';
import { formatSlug } from '@/base/helper/FormatSlug';

type Props = {
    animeList: Anime[];
};

export default function GenreAnimeSlider({ animeList }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    const goToPrevSlide = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? animeList.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex === animeList.length - 1 ? 0 : prevIndex + 1));
    }, [animeList.length]);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        const slug = formatSlug(animeList[activeIndex].href);
        router.push(`/anime/${slug}`);
    };

    React.useEffect(() => {
        if (animeList.length <= 1) return; // Don't auto-slide if only one item
        const interval = setInterval(() => {
            goToNextSlide();
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [activeIndex, animeList.length, goToNextSlide]);

    if (!animeList || animeList.length === 0) {
        return null;
    }

    return (
        <>
            <LoadingOverlay isLoading={isNavigating} message="Loading anime page..." />
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 aspect-[21/9]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className='relative w-full h-full'>
                            <Image
                                src={animeList[activeIndex].poster}
                                alt={animeList[activeIndex].title}
                                fill
                                quality={90}
                                priority={activeIndex === 0}
                                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                        {/* Show Name Overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10"
                        >
                            <div className='flex flex-col gap-3 md:gap-4 max-w-4xl'>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg tracking-tight"
                                >
                                    {animeList[activeIndex].title}
                                </motion.h2>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="flex items-center gap-2 text-xs md:text-sm text-gray-200"
                                >
                                    <span className="font-medium">{animeList[activeIndex].studios || "N/A"}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                    <span>{animeList[activeIndex].season || "N/A"}</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className='flex flex-wrap items-center gap-4 text-xs md:text-sm'
                                >
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-medium">{animeList[activeIndex].score || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>{animeList[activeIndex].episodes === null ? "N/A" : animeList[activeIndex].episodes + " Episodes"}</span>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Link
                                        href={`/anime/${formatSlug(animeList[activeIndex].href)}`}
                                        onClick={handleNavigation}
                                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors mt-2 w-fit text-sm"
                                    >
                                        Watch Now
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {animeList.length > 1 && (
                    <>
                        <motion.button
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

                {/* Dots */}
                {animeList.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-20">
                        <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                            {animeList.map((_, index) => (
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
        </>
    );
} 