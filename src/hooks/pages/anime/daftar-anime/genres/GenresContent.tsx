"use client"
import React from 'react';
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
    return (
        <section className='pt-14 py-10 bg-gray-50 dark:bg-gray-900'>
            <div className="container px-4">
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                    Daftar Genres
                </h1>

                <div className="relative">
                    <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {genresData.genreList.map((genre) => (
                            <div key={genre.genreId}>
                                <Link
                                    href={genre.href}
                                    className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow text-center h-full flex flex-col items-center justify-center'
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
