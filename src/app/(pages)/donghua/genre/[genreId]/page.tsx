import React from 'react'

import DetailsGenres from "@/hooks/pages/anichin/[genresId]/DetailsGenres"

import { Metadata, ResolvingMetadata } from "next"

import { fetchAnichinGenresId, fetchAnichinGenreData } from "@/lib/FetchAnichin"

type Props = {
    params: Promise<{ genreId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Genre {
    title: string;
    genreId: string;
    href: string;
    anichinUrl: string;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Disable static generation
export const generateStaticParams = async () => {
    return [];
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page as string) : 1;

    const [donghuaData, allGenresData] = await Promise.all([
        fetchAnichinGenresId(genreId, page),
        fetchAnichinGenreData()
    ]);

    const animeList = donghuaData?.data?.animeList;
    const allGenres = allGenresData?.data?.genreList;

    if (!animeList || animeList.length === 0 || !allGenres) {
        return {
            title: "Genre Not Found",
            description: "The requested genre could not be found.",
        };
    }

    const genreTitle = allGenres.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${genreTitle} | Riznime`,
        description: `Watch ${genreTitle} donghua online. Browse our collection of ${genreTitle} donghua series.`,
        openGraph: {
            title: `${genreTitle} | Riznime`,
            description: `Watch ${genreTitle} donghua online. Browse our collection of ${genreTitle} donghua series.`,
            images: [...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${genreTitle} Donghua | Riznime`,
            description: `Watch ${genreTitle} donghua online. Browse our collection of ${genreTitle} donghua series.`,
        },
    };
}

export default async function GenrePage({ params, searchParams }: Props) {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    return <DetailsGenres genreId={genreId} searchParams={resolvedSearchParams} />;
} 