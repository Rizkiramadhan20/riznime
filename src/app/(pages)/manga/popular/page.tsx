import React from 'react';

import { fetchMangaPopularData } from '@/lib/FetchManga';

import PopularMangaLayout from '@/hooks/pages/manga/popular/PopularMangaLayout';

import PopularMangaSkelaton from '@/hooks/pages/manga/popular/PopularSkelaton';

import StructuredData from '@/components/seo/StructuredData';

import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
    title: 'Daftar Manga Populer | Riznime',
    description: 'Jelajahi koleksi lengkap manga populer di Riznime. Temukan berbagai judul manga terpopuler dengan kualitas terbaik dan bahasa Indonesia.',
    keywords: [
        'Manga Populer',
        'Manga Terpopuler',
        'Manga Trending',
        'Daftar Manga',
        'Riznime',
        'Baca Manga Indonesia',
        'Manga Gratis',
        'Manga Terbaru',
        'Manga Terbaik'
    ],
    openGraph: {
        type: 'website',
        title: 'Daftar Manga Populer | Riznime',
        description: 'Jelajahi koleksi lengkap manga populer di Riznime. Temukan berbagai judul manga terpopuler dengan kualitas terbaik dan bahasa Indonesia.',
        url: `${BASE_URL}/manga/popular`,
        siteName: 'Riznime',
        locale: 'id_ID',
        images: [
            {
                url: `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Populer')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga populer di Riznime')}&type=manga`,
                width: 1200,
                height: 630,
                alt: 'Daftar Manga Populer - Riznime',
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
        title: 'Daftar Manga Populer | Riznime',
        description: 'Jelajahi koleksi lengkap manga populer di Riznime. Temukan berbagai judul manga terpopuler dengan kualitas terbaik dan bahasa Indonesia.',
        creator: '@rizki_ramadhan',
        site: '@rizki_ramadhan',
        images: [
            `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Populer')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga populer di Riznime')}&type=manga`,
            '/desktop.jpg'
        ],
    },
    alternates: {
        canonical: `${BASE_URL}/manga/popular`,
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

export default async function Popular() {
    try {
        const mangaData = await fetchMangaPopularData();
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
                            { name: 'Populer', url: `${BASE_URL}/manga/popular` },
                        ],
                    }}
                />
                <PopularMangaLayout mangaData={mangaData} />
            </>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <PopularMangaSkelaton />
        );
    }
}
