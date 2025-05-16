import React from 'react';

import { FetchBannerData } from '@/lib/FetchAnime';

import BannerContent from './BannerContent';

import BannerSkeleton from './BannerSkelaton';

export default async function Banner() {
    try {
        const animeData = await FetchBannerData();
        return <BannerContent animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <BannerSkeleton />
        );
    }
}
