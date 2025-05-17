'use client';

import React, { useState } from 'react';

import { Anime } from '@/types/anime';

import Button from './Button';

import Image from 'next/image';

interface BannerContentProps {
    animeData: {
        ongoing: {
            animeList: Anime[];
        };
    };
}

export default function BannerContent({ animeData }: BannerContentProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const displayedAnime = animeData.ongoing.animeList.slice(0, 4);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? displayedAnime.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === displayedAnime.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full min-h-screen flex items-end sm:items-center overflow-hidden bg-gradient-to-b from-black/90 to-black/50">
            {/* Background image with parallax effect */}
            <div className='w-full h-full'>
                <Image
                    src={displayedAnime[currentIndex].poster}
                    alt={displayedAnime[currentIndex].title}
                    fill
                    quality={100}
                    loading='eager'
                    className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105 transition-transform duration-700 ease-out z-0"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[1]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 lg:px-16 py-28 gap-6 md:gap-8">
                    {/* Left: Spotlight */}
                    <div className="w-full md:max-w-xl text-white space-y-6 md:space-y-10">
                        <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30">
                            <span className="text-primary font-semibold text-xs md:text-sm">Episode {displayedAnime[currentIndex].episodes}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {displayedAnime[currentIndex].title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-300 text-sm md:text-base">
                            <span className="flex items-center gap-1.5 md:gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                {displayedAnime[currentIndex].releaseDay}
                            </span>
                            <span className="flex items-center gap-1.5 md:gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {displayedAnime[currentIndex].latestReleaseDate}
                            </span>
                        </div>
                    </div>

                    {/* Right: Featured Anime */}
                    <div className="w-full md:w-auto flex flex-col space-y-6 md:space-y-10">
                        <div className="flex gap-2 sm:gap-3 md:gap-4 pb-4 md:pb-0">
                            {displayedAnime.map((anime: Anime, index: number) => (
                                <div
                                    key={`anime-${index}`}
                                    className={`flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-40 aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer
                                        ${currentIndex === index
                                            ? 'ring-2 ring-primary scale-105'
                                            : 'hover:scale-105 hover:ring-1 hover:ring-white/30'}`}
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
                                </div>
                            ))}
                        </div>

                        {/* Carousel navigation */}
                        <div className="relative flex gap-4 md:gap-6 z-20 justify-start">
                            <Button onClick={handlePrev} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </Button>

                            <Button onClick={handleNext} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 