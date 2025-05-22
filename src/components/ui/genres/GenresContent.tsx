"use client"

import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';

import { GenresList } from '@/types/anime';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import { formatSlug } from "@/base/helper/FormatSlug";

import {
    Sword,
    Compass,
    Laugh,
    Skull,
    Theater,
    Heart,
    Sparkles,
    Gamepad2,
    Crown,
    Landmark,
    Ghost,
    Palette,
    Wand2,
    Dumbbell,
    Bot,
    Shield,
    Music,
    Search,
    Brain,
    Theater as Theater2,
    Shield as PoliceShield,
    HeartPulse,
    SwordIcon,
    GraduationCap,
    Rocket,
    User,
    Flower2,
    HeartCrack,
    SwordIcon as ShounenIcon,
    Coffee,
    Trophy,
    Orbit,
    Zap,
    BookOpen,
    AlertTriangle,
    Moon
} from 'lucide-react';

interface GenresContentProps {
    genresData: GenresList;
}

const genreIcons: { [key: string]: React.ReactElement } = {
    'action': <Sword className="w-8 h-8 mb-2" />,
    'adventure': <Compass className="w-8 h-8 mb-2" />,
    'comedy': <Laugh className="w-8 h-8 mb-2" />,
    'demons': <Skull className="w-8 h-8 mb-2" />,
    'drama': <Theater className="w-8 h-8 mb-2" />,
    'ecchi': <Heart className="w-8 h-8 mb-2" />,
    'fantasy': <Sparkles className="w-8 h-8 mb-2" />,
    'game': <Gamepad2 className="w-8 h-8 mb-2" />,
    'harem': <Crown className="w-8 h-8 mb-2" />,
    'historical': <Landmark className="w-8 h-8 mb-2" />,
    'horror': <Ghost className="w-8 h-8 mb-2" />,
    'josei': <Palette className="w-8 h-8 mb-2" />,
    'magic': <Wand2 className="w-8 h-8 mb-2" />,
    'martial-arts': <Dumbbell className="w-8 h-8 mb-2" />,
    'mecha': <Bot className="w-8 h-8 mb-2" />,
    'military': <Shield className="w-8 h-8 mb-2" />,
    'music': <Music className="w-8 h-8 mb-2" />,
    'mystery': <Search className="w-8 h-8 mb-2" />,
    'psychological': <Brain className="w-8 h-8 mb-2" />,
    'parody': <Theater2 className="w-8 h-8 mb-2" />,
    'police': <PoliceShield className="w-8 h-8 mb-2" />,
    'romance': <HeartPulse className="w-8 h-8 mb-2" />,
    'samurai': <SwordIcon className="w-8 h-8 mb-2" />,
    'school': <GraduationCap className="w-8 h-8 mb-2" />,
    'sci-fi': <Rocket className="w-8 h-8 mb-2" />,
    'seinen': <User className="w-8 h-8 mb-2" />,
    'shoujo': <Flower2 className="w-8 h-8 mb-2" />,
    'shoujo-ai': <HeartCrack className="w-8 h-8 mb-2" />,
    'shounen': <ShounenIcon className="w-8 h-8 mb-2" />,
    'slice-of-life': <Coffee className="w-8 h-8 mb-2" />,
    'sports': <Trophy className="w-8 h-8 mb-2" />,
    'space': <Orbit className="w-8 h-8 mb-2" />,
    'super-power': <Zap className="w-8 h-8 mb-2" />,
    'supernatural': <BookOpen className="w-8 h-8 mb-2" />,
    'thriller': <AlertTriangle className="w-8 h-8 mb-2" />,
    'vampire': <Moon className="w-8 h-8 mb-2" />,
};

export default function GenresContent({ genresData }: GenresContentProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [startTouchX, setStartTouchX] = useState(0);
    const [isTouching, setIsTouching] = useState(false);

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

    const handleGenreClick = (e: React.MouseEvent<HTMLAnchorElement>, genreId: string) => {
        e.preventDefault();
        if (isDragging || isTouching) return;

        setLoadingId(genreId);
        setLoadingProgress(0);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                router.push(`/genres/${formatSlug(genreId)}`);
            }
        }, 100);
    };

    return (
        <section className='pt-14 bg-gray-50 dark:bg-gray-900'>
            <LoadingOverlay
                isLoading={!!loadingId || loadingProgress > 0}
                message="Loading is progress"
                progress={loadingProgress}
            />
            <div className="container px-4">
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-4 pb-4 cursor-grab active:cursor-grabbing select-none scrollbar-hide"
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
                        {genresData.genreList.map((genre) => (
                            <div key={genre.genreId} className="flex-none w-[170px]">
                                <Link
                                    href={genre.href}
                                    className='block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow text-center'
                                    draggable="false"
                                    onClick={(e) => handleGenreClick(e, genre.genreId)}
                                >
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        {genreIcons[genre.genreId]}
                                        <span className="text-lg font-medium">{genre.title}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
