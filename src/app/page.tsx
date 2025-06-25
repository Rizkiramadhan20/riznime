import React, { Fragment } from 'react';

import { fetchAnimeData, FetchBannerData, fetchGenresData, fetchScheduleData } from '@/lib/FetchAnime';

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

    const posterMap = new Map<string, string>();
    if (animeData?.ongoing_anime) {
      for (const anime of animeData.ongoing_anime) {
        posterMap.set(anime.href, anime.poster);
      }
    }

    const scheduleWithPosters = {
      ...response,
      data: {
        ...response.data,
        days: response.data.days.map((day: DaySchedule) => ({
          ...day,
          animeList: day.animeList.map((anime: AnimeSchedule) => ({
            ...anime,
            poster: posterMap.get(anime.href) || null
          }))
        }))
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