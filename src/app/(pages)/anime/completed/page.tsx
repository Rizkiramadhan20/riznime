import React from 'react';

import { fetchCompletedData } from '@/lib/FetchAnime';

import AnimeCompleted from '@/hooks/pages/anime/completed/AnimeCompleted';

import AnimeCompletedSkeleton from '@/hooks/pages/anime/completed/AnimeCompletedSkelaton';

import StructuredData from '@/components/seo/StructuredData';

import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
    title: 'Daftar Anime Completed | Riznime',
    description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
    keywords: [
        'Anime Completed',
        'Anime Selesai',
        'Anime Lengkap',
        'Daftar Anime',
        'Riznime',
        'Streaming Anime Indonesia',
        'Anime Subtitle Indonesia',
        'Nonton Anime Gratis',
        'Anime Terbaru',
        'Anime Populer'
    ],
    openGraph: {
        type: 'website',
        title: 'Daftar Anime Completed | Riznime',
        description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
        url: `${BASE_URL}/anime/completed`,
        siteName: 'Riznime',
        locale: 'id_ID',
        images: [
            {
                url: `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Anime Completed')}&description=${encodeURIComponent('Jelajahi koleksi lengkap anime completed di Riznime')}&type=anime`,
                width: 1200,
                height: 630,
                alt: 'Daftar Anime Completed - Riznime',
            },
            {
                url: '/desktop.jpg',
                width: 1200,
                height: 630,
                alt: 'Riznime - Pusatnya Anime',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Daftar Anime Completed | Riznime',
        description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
        creator: '@rizki_ramadhan',
        site: '@rizki_ramadhan',
        images: [
            `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Anime Completed')}&description=${encodeURIComponent('Jelajahi koleksi lengkap anime completed di Riznime')}&type=anime`,
            '/desktop.jpg'
        ],
    },
    alternates: {
        canonical: `${BASE_URL}/anime/completed`,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default async function Ongoing() {
    try {
        const response = await fetchCompletedData();
        const animeData = {
            animeList: response.data.animeList,
            pagination: response.pagination
        };
        return (
            <>
                <StructuredData
                    type="website"
                    data={{
                        name: 'Riznime',
                        description: 'Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!',
                        url: BASE_URL,
                    }}
                />
                <StructuredData
                    type="breadcrumb"
                    data={{
                        items: [
                            { name: 'Beranda', url: BASE_URL },
                            { name: 'Anime', url: `${BASE_URL}/anime` },
                            { name: 'Completed', url: `${BASE_URL}/anime/completed` },
                        ],
                    }}
                />
                <AnimeCompleted animeData={animeData} />
            </>
        );
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeCompletedSkeleton />
        );
    }
}