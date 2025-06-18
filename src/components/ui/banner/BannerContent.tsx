'use client';

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Anime } from '@/types/anime';

import Button from './Button';

import Image from 'next/image';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { formatSlug } from "@/base/helper/FormatSlug";

interface BannerContentProps {
    bannerData: {
        ongoing: {
            animeList: Anime[];
        };
    };
}

export default function BannerContent({ bannerData }: BannerContentProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const displayedAnime = bannerData.ongoing.animeList.slice(0, 4);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoplay) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev === displayedAnime.length - 1 ? 0 : prev + 1));
            }, 5000); // Change slide every 5 seconds
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isAutoplay, displayedAnime.length]);

    const handlePrev = () => {
        setIsAutoplay(false); // Stop autoplay when user manually navigates
        setCurrentIndex((prev) => (prev === 0 ? displayedAnime.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIsAutoplay(false); // Stop autoplay when user manually navigates
        setCurrentIndex((prev) => (prev === displayedAnime.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index: number) => {
        setIsAutoplay(false); // Stop autoplay when user clicks thumbnail
        setCurrentIndex(index);
    };

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
                router.push(`/anime/${formatSlug(animeId)}`);
            }
        }, 100);
    };

    return (
        <div className="relative w-full min-h-screen flex items-end sm:items-center overflow-hidden bg-gradient-to-b from-black/90 to-black/50 z-0">
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            {/* Background image with parallax effect */}
            <div className="absolute inset-0 w-full h-full min-h-screen -z-10">
                <div className="relative w-full h-full min-h-screen">
                    <AnimatePresence mode="wait">
                        {displayedAnime.map((anime, index) => (
                            currentIndex === index && (
                                <motion.div
                                    key={`slide-${index}`}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={anime.poster}
                                        alt={anime.title}
                                        fill
                                        quality={100}
                                        loading='eager'
                                        className="w-full h-full object-cover brightness-50"
                                        priority={index === 0}
                                    />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 lg:px-16 py-28 gap-6 md:gap-8">
                {/* Left: Spotlight */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:max-w-xl text-white space-y-6 md:space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30"
                    >
                        <span className="text-primary font-semibold text-xs md:text-sm">Episode {displayedAnime[currentIndex].episodes}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent line-clamp-3"
                    >
                        {displayedAnime[currentIndex].title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-300 text-sm md:text-base"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center gap-1.5 md:gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {displayedAnime[currentIndex].releaseDay}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-center gap-1.5 md:gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {displayedAnime[currentIndex].latestReleaseDate}
                        </motion.span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Link
                            href={`/anime/${displayedAnime[currentIndex].href}`}
                            onClick={(e) => handleAnimeClick(e, displayedAnime[currentIndex].href)}
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg overflow-hidden"
                        >
                            <motion.span
                                className="relative z-10"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Watch Now
                            </motion.span>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 relative z-10"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </motion.svg>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right: Featured Anime */}
                <div className="w-full md:w-auto flex flex-col space-y-6 md:space-y-10">
                    <div className="flex gap-2 sm:gap-3 md:gap-4 pb-4 md:pb-0">
                        {displayedAnime.map((anime: Anime, index: number) => (
                            <motion.div
                                key={`anime-${index}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-40 aspect-[2/3] rounded-xl overflow-hidden shadow-lg cursor-pointer
                                    ${currentIndex === index
                                        ? 'ring-2 ring-primary scale-105'
                                        : 'hover:ring-1 hover:ring-white/30'}`}
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    width={160}
                                    height={240}
                                    loading='lazy'
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Carousel navigation */}
                    <div className="relative flex gap-4 md:gap-6 z-20 justify-start">
                        <Button onClick={handlePrev} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </Button>

                        <Button onClick={handleNext} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 