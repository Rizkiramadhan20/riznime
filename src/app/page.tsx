import React, { Fragment } from 'react';

import { fetchAnimeData } from '@/lib/FetchAnime';

import { FetchBannerData } from '@/lib/FetchAnime';

import { fetchGenresData } from '@/lib/FetchAnime';

import { fetchScheduleData, fetchAnimePoster } from '@/lib/FetchAnime';

import AnimeContent from '@/components/ui/anime/AnimeContent';

import BannerContent from '@/components/ui/banner/BannerContent';

import GenresContent from '@/components/ui/genres/GenresContent';

import { DaySchedule, AnimeSchedule } from '@/types/anime';

import ScheduleContent from '@/components/ui/schedule/ScheduleContent';

import AnimeContentSkeleton from '@/components/ui/anime/AnimeContentSkeleton';

export default async function Page() {
  try {
    const animeData = await fetchAnimeData();
    const bannerData = await FetchBannerData();
    const genresData = await fetchGenresData();
    const response = await fetchScheduleData();

    if (!response || !response.ok || !response.data) {
      throw new Error('Failed to fetch schedule data');
    }

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

    return <Fragment>
      <BannerContent bannerData={bannerData} />
      <AnimeContent animeData={animeData} />
      <GenresContent genresData={genresData} />
      <ScheduleContent animeData={scheduleWithPosters} />
    </Fragment>;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return (
      <AnimeContentSkeleton />
    );
  }
}