import React from 'react';

import { fetchMangaRecentData } from '@/lib/FetchManga';

import RecentMangaLayout from '@/hooks/pages/manga/recent/RecentMangaLayout';

import RecentMangaSkelaton from '@/hooks/pages/manga/recent/RecentMangaSkelaton';

import StructuredData from '@/components/seo/StructuredData';

import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
    title: 'Daftar Manga Terbaru | Riznime',
    description: 'Jelajahi koleksi lengkap manga terbaru di Riznime. Temukan berbagai judul manga terbaru dengan kualitas terbaik dan bahasa Indonesia.',
    keywords: [
        'Manga Terbaru',
        'Manga Latest',
        'Manga Update',
        'Daftar Manga',
        'Riznime',
        'Baca Manga Indonesia',
        'Manga Gratis',
        'Manga Baru',
        'Manga Terkini'
    ],
    openGraph: {
        type: 'website',
        title: 'Daftar Manga Terbaru | Riznime',
        description: 'Jelajahi koleksi lengkap manga terbaru di Riznime. Temukan berbagai judul manga terbaru dengan kualitas terbaik dan bahasa Indonesia.',
        url: `${BASE_URL}/manga/recent`,
        siteName: 'Riznime',
        locale: 'id_ID',
        images: [
            {
                url: `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Terbaru')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga terbaru di Riznime')}&type=manga`,
                width: 1200,
                height: 630,
                alt: 'Daftar Manga Terbaru - Riznime',
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
        title: 'Daftar Manga Terbaru | Riznime',
        description: 'Jelajahi koleksi lengkap manga terbaru di Riznime. Temukan berbagai judul manga terbaru dengan kualitas terbaik dan bahasa Indonesia.',
        creator: '@rizki_ramadhan',
        site: '@rizki_ramadhan',
        images: [
            `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Terbaru')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga terbaru di Riznime')}&type=manga`,
            '/desktop.jpg'
        ],
    },
    alternates: {
        canonical: `${BASE_URL}/manga/recent`,
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

export default async function Recent() {
    try {
        const page = 1;
        const mangaData = await fetchMangaRecentData(page);
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
                            { name: 'Manga', url: `${BASE_URL}/manga` },
                            { name: 'Terbaru', url: `${BASE_URL}/manga/recent` },
                        ],
                    }}
                />
                <RecentMangaLayout mangaData={mangaData} />
            </>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <RecentMangaSkelaton />
        );
    }
}
