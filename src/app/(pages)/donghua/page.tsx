import React, { Fragment } from 'react';

import { fetchAnichinData } from '@/lib/FetchAnichin';

import Banner from "@/hooks/pages/anichin/banner/Banner"

import AnichinContent from "@/hooks/pages/anichin/AnichinContent"

import Ongoing from "@/hooks/pages/anichin/ongoing/Ongoing"

import AnichinSkeleton from '@/hooks/pages/anichin/AnichinSkeleton';

export default async function Page() {
    try {
        const anichinData = await fetchAnichinData();

        return <Fragment>
            <Banner anichinData={anichinData} />
            <AnichinContent anichinData={anichinData} />
            <Ongoing anichinData={anichinData} />
        </Fragment>;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return (
            <AnichinSkeleton />
        );
    }
}