import React from 'react';

import { BannerData } from '@/lib/api';

import BannerContent from './BannerContent';

import BannerSkeleton from './BannerSkelaton';

export default async function Banner() {
    try {
        const animeData = await BannerData();
        return <BannerContent animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching banner data:', error);
        return (
            <BannerSkeleton />
        );
    }
}
