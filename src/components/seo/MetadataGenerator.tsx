import React from 'react';
import { Metadata } from 'next';
import StructuredData from './StructuredData';

interface MetadataGeneratorProps {
    type: 'anime' | 'manga' | 'donghua' | 'episode' | 'chapter' | 'page';
    title: string;
    description: string;
    image?: string;
    url?: string;
    additionalData?: Record<string, unknown>;
}

export const generateMetadata = ({
    type,
    title,
    description,
    image,
    url,
    additionalData = {}
}: MetadataGeneratorProps): Metadata => {
    const BASE_URL = process.env.NEXT_PUBLIC_URL as string;
    const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const imageUrl = image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}/desktop.jpg`;

    const baseMetadata: Metadata = {
        title: `${title} - Riznime`,
        description: description,
        keywords: [
            title,
            type === 'anime' ? 'Anime' : type === 'manga' ? 'Manga' : 'Donghua',
            'Riznime',
            'Streaming Indonesia',
            'Nonton Gratis',
            'Subtitle Indonesia',
        ],
        openGraph: {
            type: 'website',
            title: `${title} - Riznime`,
            description: description,
            url: fullUrl,
            siteName: 'Riznime',
            locale: 'id_ID',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Riznime`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} - Riznime`,
            description: description,
            creator: '@rizki_ramadhan',
            site: '@rizki_ramadhan',
            images: [imageUrl],
        },
        alternates: {
            canonical: fullUrl,
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
    };

    // Add specific metadata based on type
    if (type === 'episode' && additionalData.seriesTitle) {
        baseMetadata.title = `${title} - ${additionalData.seriesTitle} - Riznime`;
        baseMetadata.openGraph!.title = `${title} - ${additionalData.seriesTitle} - Riznime`;
        baseMetadata.twitter!.title = `${title} - ${additionalData.seriesTitle} - Riznime`;
    }

    if (type === 'chapter' && additionalData.mangaTitle) {
        baseMetadata.title = `${title} - ${additionalData.mangaTitle} - Riznime`;
        baseMetadata.openGraph!.title = `${title} - ${additionalData.mangaTitle} - Riznime`;
        baseMetadata.twitter!.title = `${title} - ${additionalData.mangaTitle} - Riznime`;
    }

    return baseMetadata;
};

export const MetadataGenerator: React.FC<{
    type: 'anime' | 'manga' | 'donghua' | 'episode' | 'chapter' | 'website' | 'breadcrumb';
    data: Record<string, unknown>;
}> = ({ type, data }) => {
    return <StructuredData type={type} data={data as never} />;
};

export default MetadataGenerator;
