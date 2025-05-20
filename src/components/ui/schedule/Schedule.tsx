import React from 'react';

import { fetchScheduleData, fetchAnimePoster } from '@/lib/FetchAnime';

import ScheduleContent from '@/components/ui/schedule/ScheduleContent';

import ScheduleSkelaton from '@/components/ui/schedule/ScheduleSkelaton';

import { DaySchedule, AnimeSchedule } from '@/types/anime';

export default async function Schedule() {
    try {
        const response = await fetchScheduleData();
        if (!response || !response.ok || !response.data) {
            throw new Error('Failed to fetch schedule data');
        }

        // Fetch poster for each anime
        const scheduleWithPosters = {
            ...response,
            data: {
                ...response.data,
                days: await Promise.all(
                    response.data.days.map(async (day: DaySchedule) => ({
                        ...day,
                        animeList: await Promise.all(
                            day.animeList.map(async (anime: AnimeSchedule) => ({
                                ...anime,
                                poster: await fetchAnimePoster(anime.animeId)
                            }))
                        )
                    }))
                )
            }
        };

        return <ScheduleContent animeData={scheduleWithPosters} />;
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        return <ScheduleSkelaton />;
    }
}
