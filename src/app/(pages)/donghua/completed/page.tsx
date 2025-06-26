import React from 'react';

import { fetchDonghuaCompletedData } from '@/lib/FetchAnichin';

import CompletedAnichinLayout from '@/hooks/pages/anichin/completed/CompletedAnichinLayout';

import CompletedSkelaton from '@/hooks/pages/anichin/completed/CompletedSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donghua Completed | Riznime',
    description: 'Manga Completed',
}

export default async function Popular() {
    try {
        const response = await fetchDonghuaCompletedData();
        const anichinData = {
            animeList: response.data.animeList,
            pagination: response.pagination
        };
        return <CompletedAnichinLayout anichinData={anichinData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <CompletedSkelaton />
        );
    }
}
