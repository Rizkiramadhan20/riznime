import React, { Fragment } from 'react';

import { fetchAnimeData, FetchBannerData, fetchGenresData, fetchScheduleData } from '@/lib/FetchAnime';

import AnimeContent from '@/components/ui/anime/AnimeContent';

import BannerContent from '@/components/ui/banner/BannerContent';

import GenresContent from '@/components/ui/genres/GenresContent';

import ScheduleContent from '@/components/ui/schedule/ScheduleContent';

import AnimeContentSkeleton from '@/components/ui/anime/AnimeContentSkeleton';

import Download from "@/components/ui/download/Download"

import HorizontalAd from '@/components/ads/HorizontalAd'

import { metadata } from "@/base/meta/Metadata";

export { metadata };

export default async function Page() {
  try {
    const animeData = await fetchAnimeData();
    const bannerData = await FetchBannerData();
    const genresData = await fetchGenresData();
    const response = await fetchScheduleData();

    if (!response || !response.ok || !response.data) {
      throw new Error('Failed to fetch schedule data');
    }

    return <Fragment>
      <BannerContent bannerData={bannerData} />
      <HorizontalAd />
      <AnimeContent animeData={animeData} />
      <GenresContent genresData={genresData} />
      <ScheduleContent animeData={response} />
      <Download />
    </Fragment>;
  } catch {
    return (
      <AnimeContentSkeleton />
    );
  }
}