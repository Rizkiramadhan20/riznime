"use client"

import React, { useState, useRef, MouseEvent, useEffect, TouchEvent } from 'react';

import { ScheduleResponse } from '@/interface/anime';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { formatSlug } from "@/base/helper/FormatSlug";

import ImagePlaceholder from '@/base/helper/ImagePlaceholder';

export default function ScheduleContent({ animeData }: { animeData: ScheduleResponse | null }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    // Fungsi untuk mendapatkan hari dalam bahasa Indonesia
    const getCurrentDayInIndonesian = () => {
        const days = {
            'Sunday': 'Minggu',
            'Monday': 'Senin',
            'Tuesday': 'Selasa',
            'Wednesday': 'Rabu',
            'Thursday': 'Kamis',
            'Friday': 'Jumat',
            'Saturday': 'Sabtu'
        };
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        return days[currentDay as keyof typeof days];
    };

    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [startTouchX, setStartTouchX] = useState(0);
    const [isTouching, setIsTouching] = useState(false);

    // Set hari default saat komponen dimuat
    useEffect(() => {
        const currentDay = getCurrentDayInIndonesian();
        // Cek apakah hari saat ini ada dalam data anime
        const isCurrentDayAvailable = animeData?.data?.days.some(day => day.day === currentDay);

        if (isCurrentDayAvailable) {
            setSelectedDay(currentDay);
        } else {
            // Jika hari saat ini tidak tersedia, gunakan hari pertama dari data
            setSelectedDay(animeData?.data?.days[0]?.day || null);
        }
    }, [animeData]);

    const handleMouseDown = (e: MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (!sliderRef.current) return;
        setIsTouching(true);
        setStartTouchX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isTouching || !sliderRef.current) return;
        e.preventDefault();
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startTouchX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
    };

    const handleAnimeClick = (e: React.MouseEvent<HTMLAnchorElement>, animeId: string) => {
        e.preventDefault();
        if (isDragging || isTouching) return;

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

    if (!animeData || !animeData.data || !animeData.data.days) {
        return (
            <section className='py-12 bg-gray-50 dark:bg-gray-900'>
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        Tidak ada data jadwal yang tersedia
                    </div>
                </div>
            </section>
        );
    }

    const allAnime = animeData.data.days.flatMap(day => day.animeList);

    const filteredAnime = selectedDay
        ? animeData.data.days.find(day => day.day === selectedDay)?.animeList || []
        : allAnime;

    return (
        <section className='py-5 sm:py-8 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            <div className="container px-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Jadwal Rilis</h2>

                {/* Filter Buttons */}
                <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
                    <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl w-fit min-w-full sm:min-w-0">
                        {animeData.data.days.map((day) => (
                            <motion.button
                                key={day.day}
                                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 ${selectedDay === day.day
                                    ? 'text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                onClick={() => setSelectedDay(day.day)}
                            >
                                {selectedDay === day.day && (
                                    <motion.div
                                        layoutId="activeDay"
                                        className="absolute inset-0 bg-blue-600 rounded-lg"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{day.day}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Anime List */}
                <div className="relative">
                    {/* Gradient Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div
                        ref={sliderRef}
                        className="w-full overflow-x-auto touch-pan-x cursor-grab active:cursor-grabbing select-none
                        scrollbar-hide pb-4"
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
                            msOverflowStyle: 'none',  /* IE and Edge */
                            scrollbarWidth: 'none'    /* Firefox */
                        } as React.CSSProperties}
                    >
                        <div className="flex gap-3 sm:gap-4 lg:gap-6 px-4">
                            {filteredAnime.map((anime) => (
                                <div
                                    key={anime.animeId}
                                    className="flex-none group touch-pan-y"
                                    onDragStart={(e) => e.preventDefault()}
                                >
                                    <Link
                                        href={`/anime/${anime.href}`}
                                        className="block w-[140px] sm:w-[160px] lg:w-[180px]"
                                        onClick={(e) => handleAnimeClick(e, anime.href)}
                                    >
                                        {/* Poster Replacement */}
                                        <div className="relative w-full aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 ring-1 ring-black/5 dark:ring-white/5 group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
                                            <ImagePlaceholder />
                                        </div>
                                        {/* Title */}
                                        <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                                            {anime.title}
                                        </h3>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
