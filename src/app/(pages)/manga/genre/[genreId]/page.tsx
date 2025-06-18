import React from 'react'

import DetailsGenres from "@/hooks/pages/manga/[genresId]/DetailsGenres"

import { Metadata, ResolvingMetadata } from "next"

import { fetchMangaGenresId } from "@/lib/FetchManga"

type Props = {
    params: Promise<{ genreId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Genre {
    title: string;
    genreId: string;
    href: string;
    otakudesuUrl: string;
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

    // fetch data
    const mangaData = await fetchMangaGenresId(genreId, page);
    const mangaList = mangaData?.data?.mangaList;

    if (!mangaList || mangaList.length === 0) {
        return {
            title: "Genre Not Found",
            description: "The requested genre could not be found.",
        };
    }

    // Get the first manga's genre title for metadata
    const genreTitle = mangaList[0].genreList.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${genreTitle} | Riznime`,
        description: `Read ${genreTitle} manga online. Browse our collection of ${genreTitle} manga series.`,
        openGraph: {
            title: `${genreTitle} | Riznime`,
            description: `Read ${genreTitle} manga online. Browse our collection of ${genreTitle} manga series.`,
            images: [...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${genreTitle} Manga | Riznime`,
            description: `Read ${genreTitle} manga online. Browse our collection of ${genreTitle} manga series.`,
        },
    };
}

export default async function GenrePage({ params, searchParams }: Props) {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    return <DetailsGenres genreId={genreId} searchParams={resolvedSearchParams} />;
} 