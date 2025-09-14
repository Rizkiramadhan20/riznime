import React from 'react';

import { fetchMangaCompletedData } from '@/lib/FetchManga';

import CompletedMangaLayout from '@/hooks/pages/manga/completed/CompletedMangaLayout';

import CompletedSkelaton from '@/hooks/pages/manga/completed/CompletedSkelaton.';

import StructuredData from '@/components/seo/StructuredData';

import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
    title: 'Daftar Manga Completed | Riznime',
    description: 'Jelajahi koleksi lengkap manga completed di Riznime. Temukan berbagai judul manga yang sudah selesai dengan kualitas terbaik dan bahasa Indonesia.',
    keywords: [
        'Manga Completed',
        'Manga Selesai',
        'Manga Lengkap',
        'Daftar Manga',
        'Riznime',
        'Baca Manga Indonesia',
        'Manga Gratis',
        'Manga Terbaru',
        'Manga Populer'
    ],
    openGraph: {
        type: 'website',
        title: 'Daftar Manga Completed | Riznime',
        description: 'Jelajahi koleksi lengkap manga completed di Riznime. Temukan berbagai judul manga yang sudah selesai dengan kualitas terbaik dan bahasa Indonesia.',
        url: `${BASE_URL}/manga/completed`,
        siteName: 'Riznime',
        locale: 'id_ID',
        images: [
            {
                url: `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Completed')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga completed di Riznime')}&type=manga`,
                width: 1200,
                height: 630,
                alt: 'Daftar Manga Completed - Riznime',
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
        title: 'Daftar Manga Completed | Riznime',
        description: 'Jelajahi koleksi lengkap manga completed di Riznime. Temukan berbagai judul manga yang sudah selesai dengan kualitas terbaik dan bahasa Indonesia.',
        creator: '@rizki_ramadhan',
        site: '@rizki_ramadhan',
        images: [
            `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Completed')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga completed di Riznime')}&type=manga`,
            '/desktop.jpg'
        ],
    },
    alternates: {
        canonical: `${BASE_URL}/manga/completed`,
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
        const mangaData = await fetchMangaCompletedData();
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
                            { name: 'Completed', url: `${BASE_URL}/manga/completed` },
                        ],
                    }}
                />
                <CompletedMangaLayout mangaData={mangaData} />
            </>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <CompletedSkelaton />
        );
    }
}
