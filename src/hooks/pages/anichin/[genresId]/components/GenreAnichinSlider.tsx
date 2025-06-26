"use client";

import React, { useState, useCallback } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';

import { GenreAnichin } from '@/interface/anichin';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import ImagePlaceholder from '@/base/helper/ImagePlaceholder';

import { useRouter } from 'next/navigation';

import { formatSlug } from '@/base/helper/FormatSlugAnichin';

type Props = {
    donghuaList: GenreAnichin[];
};

export default function GenreAnichinSlider({ donghuaList }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    const goToPrevSlide = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? donghuaList.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex === donghuaList.length - 1 ? 0 : prevIndex + 1));
    }, [donghuaList.length]);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        const href = `/donghua/${formatSlug(donghuaList[activeIndex].href)}`;
        router.push(href);
    };

    React.useEffect(() => {
        if (donghuaList.length <= 1) return;
        const interval = setInterval(() => {
            goToNextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, donghuaList.length, goToNextSlide]);

    if (!donghuaList || donghuaList.length === 0) {
        return null;
    }

    return (
        <>
            <LoadingOverlay isLoading={isNavigating} message="Loading donghua page..." />
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
                            {imageError ? (
                                <ImagePlaceholder className="w-full h-full" />
                            ) : (
                                <Image
                                    src={donghuaList[activeIndex].poster}
                                    alt={donghuaList[activeIndex].title}
                                    fill
                                    quality={90}
                                    priority={activeIndex === 0}
                                    className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    onError={() => setImageError(true)}
                                />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                        {/* Content Overlay */}
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
                                    {donghuaList[activeIndex].title}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="flex items-center gap-2 text-xs md:text-sm text-gray-200"
                                >
                                    <span className="font-medium">{donghuaList[activeIndex].type || "N/A"}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                    <span>{donghuaList[activeIndex].episode || "N/A"}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                    <span>{donghuaList[activeIndex].quality || "N/A"}</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                    className="flex items-center gap-4"
                                >
                                    <Link
                                        href={`/donghua/${formatSlug(donghuaList[activeIndex].href)}`}
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
                {donghuaList.length > 1 && (
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
                {donghuaList.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-20">
                        <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                            {donghuaList.map((_, index) => (
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