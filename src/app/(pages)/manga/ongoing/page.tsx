import React from 'react';

import { fetchMangaOngoingData } from '@/lib/FetchManga';

import OngoingMangaLayout from '@/hooks/pages/manga/ongoing/OngoingLayout';

import OngoingMangaSkelaton from '@/hooks/pages/manga/ongoing/OngoingMangaSkelaton';

import StructuredData from '@/components/seo/StructuredData';

import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const metadata: Metadata = {
    title: 'Daftar Manga Ongoing | Riznime',
    description: 'Jelajahi koleksi lengkap manga ongoing di Riznime. Temukan berbagai judul manga yang sedang berlangsung dengan kualitas terbaik dan bahasa Indonesia.',
    keywords: [
        'Manga Ongoing',
        'Manga Sedang Berlangsung',
        'Manga Berlangsung',
        'Daftar Manga',
        'Riznime',
        'Baca Manga Indonesia',
        'Manga Gratis',
        'Manga Terbaru',
        'Manga Populer'
    ],
    openGraph: {
        type: 'website',
        title: 'Daftar Manga Ongoing | Riznime',
        description: 'Jelajahi koleksi lengkap manga ongoing di Riznime. Temukan berbagai judul manga yang sedang berlangsung dengan kualitas terbaik dan bahasa Indonesia.',
        url: `${BASE_URL}/manga/ongoing`,
        siteName: 'Riznime',
        locale: 'id_ID',
        images: [
            {
                url: `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Ongoing')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga ongoing di Riznime')}&type=manga`,
                width: 1200,
                height: 630,
                alt: 'Daftar Manga Ongoing - Riznime',
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
        title: 'Daftar Manga Ongoing | Riznime',
        description: 'Jelajahi koleksi lengkap manga ongoing di Riznime. Temukan berbagai judul manga yang sedang berlangsung dengan kualitas terbaik dan bahasa Indonesia.',
        creator: '@rizki_ramadhan',
        site: '@rizki_ramadhan',
        images: [
            `${BASE_URL}/api/og?title=${encodeURIComponent('Daftar Manga Ongoing')}&description=${encodeURIComponent('Jelajahi koleksi lengkap manga ongoing di Riznime')}&type=manga`,
            '/desktop.jpg'
        ],
    },
    alternates: {
        canonical: `${BASE_URL}/manga/ongoing`,
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
        const mangaData = await fetchMangaOngoingData();
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
                            { name: 'Ongoing', url: `${BASE_URL}/manga/ongoing` },
                        ],
                    }}
                />
                <OngoingMangaLayout mangaData={mangaData} />
            </>
        );
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <OngoingMangaSkelaton />
        );
    }
}
