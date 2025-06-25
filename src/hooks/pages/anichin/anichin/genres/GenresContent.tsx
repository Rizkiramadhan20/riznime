"use client"

import React, { useState } from 'react'

import { GenreResponse } from '@/hooks/pages/anichin/anichin/genres/types/genres';

import Link from 'next/link'

import { Card } from 'flowbite-react';

import { useRouter } from 'next/navigation';

import LoadingOverlay from '@/base/helper/LoadingOverlay';

import {
    Sword,
    Tv,
    Users,
    Compass,
    Laugh,
    UtensilsCrossed,
    Shield,
    Skull,
    Ghost,
    Drama,
    Gamepad2,
    Wand2,
    Swords,
    School2,
    Music2,
    Brain,
    Heart,
    Dumbbell,
    Zap,
    Footprints,
    Clock,
    Skull as SkullIcon,
    Flame,
    LucideIcon,
    BookOpen
} from 'lucide-react';

interface CategoryContentProps {
    anichinData: GenreResponse;
}

const getGenreIcon = (genreId: string): LucideIcon => {
    const iconMap: { [key: string]: LucideIcon } = {
        'action': Sword,
        'adaptation': Tv,
        'adult': Users,
        'adventure': Compass,
        'comedy': Laugh,
        'cooking': UtensilsCrossed,
        'crime': Shield,
        'demons': Skull,
        'ghosts': Ghost,
        'drama': Drama,
        'game': Gamepad2,
        'fantasy': Wand2,
        'martial-arts': Swords,
        'school': School2,
        'school-life': School2,
        'music': Music2,
        'musical': Music2,
        'mystery': Brain,
        'romance': Heart,
        'sport': Dumbbell,
        'sports': Dumbbell,
        'super-power': Zap,
        'supernatural': Footprints,
        'time-travel': Clock,
        'horror': SkullIcon,
        'magic': Flame,
    };

    return iconMap[genreId] || BookOpen;
};

export default function CategoryContent({ anichinData }: CategoryContentProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(e.currentTarget.href);
    };

    return (
        <section className='mb-10 md:mb-20'>
            <LoadingOverlay isLoading={isLoading} message="Loading Genre..." />

            <div className='container px-4 flex flex-col gap-6 md:gap-8'>
                <div className='flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                    <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>Categories</h3>
                </div>

                <article className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {anichinData.data.genreList.map((anichin) => {
                        const Icon = getGenreIcon(anichin.genreId);
                        return (
                            <Link href={`donghua/genre/${anichin.href}`} key={anichin.genreId} onClick={handleLinkClick}>
                                <Card className="group h-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer">
                                    <div className="flex flex-col items-center gap-2 p-2">
                                        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200" />
                                        <h4 className="text-center text-gray-900 dark:text-white font-medium">
                                            {anichin.title}
                                        </h4>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </article>
            </div>
        </section>
    )
}
