import React, { Fragment } from 'react';

import { fetchAnichinData, fetchAnichinGenreData, fetchAnichinScheduleData, fetchDonghuaCompletedData } from '@/lib/FetchAnichin';

import Banner from "@/hooks/pages/anichin/anichin/banner/Banner"

import AnichinContent from "@/hooks/pages/anichin/anichin/AnichinContent"

import Ongoing from "@/hooks/pages/anichin/anichin/ongoing/Ongoing"

import AnichinSkeleton from '@/hooks/pages/anichin/anichin/AnichinSkeleton';

import GenreContent from '@/hooks/pages/anichin/anichin/genres/GenresContent';

import ScheduleContent from '@/hooks/pages/anichin/anichin/schedule/ScheduleContent';

import CompletedContent from '@/hooks/pages/anichin/anichin/completed/CompletedContent';
export default async function Page() {
    try {
        const anichinData = await fetchAnichinData();
        const genreAnichinData = await fetchAnichinGenreData();
        const scheduleAnichinData = await fetchAnichinScheduleData();
        const completedAnichinData = await fetchDonghuaCompletedData();

        return <Fragment>
            <Banner anichinData={anichinData} />
            <AnichinContent anichinData={anichinData} />
            <Ongoing anichinData={anichinData} />
            <GenreContent anichinData={genreAnichinData} />
            <ScheduleContent scheduleAnichinData={scheduleAnichinData} />
            <CompletedContent completedAnichinData={completedAnichinData} />
        </Fragment>;
    } catch (error) {
        console.error('Error fetching donghua data:', error);
        return (
            <AnichinSkeleton />
        );
    }
}