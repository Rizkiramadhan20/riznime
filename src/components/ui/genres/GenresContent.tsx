"use client"
import React, { useState } from 'react';

import { GenresList } from '@/types/anime';

import Link from 'next/link';
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
    const [showAll, setShowAll] = useState(false);
    const initialGenres = genresData.genreList.slice(0, 12);
    const displayedGenres = showAll ? genresData.genreList : initialGenres;

    return (
        <section className='py-16 bg-gray-50 dark:bg-gray-900'>
            <div className="container px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">All Genres</h1>
                <div className="flex flex-col gap-4 xl:flex xl:flex-wrap xl:justify-center xl:overflow-visible">
                    <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide xl:flex-wrap xl:overflow-visible xl:pb-0 xl:justify-center xl:w-full">
                        {displayedGenres.slice(0, Math.ceil(displayedGenres.length / 2)).map((genre) => (
                            <Link
                                key={genre.genreId}
                                href={genre.href}
                                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center w-[170px] flex-shrink-0 xl:flex-shrink"
                            >
                                {genreIcons[genre.genreId]}
                                <span className="text-lg font-medium">{genre.title}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-row-reverse gap-4 overflow-x-auto pb-4 scrollbar-hide xl:flex-wrap xl:overflow-visible xl:pb-0 xl:justify-center xl:w-full">
                        {displayedGenres.slice(Math.ceil(displayedGenres.length / 2)).map((genre) => (
                            <Link
                                key={genre.genreId}
                                href={genre.href}
                                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center w-[160px] flex-shrink-0 xl:flex-shrink"
                            >
                                {genreIcons[genre.genreId]}
                                <span className="text-lg font-medium">{genre.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                {!showAll && genresData.genreList.length > 12 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
