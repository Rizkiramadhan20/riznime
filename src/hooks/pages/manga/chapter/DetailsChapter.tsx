import React from 'react'

import DetailsChapterkelaton from '@/hooks/pages/manga/chapter/DetailsChapterkelaton'

import { fetchMangaByChapter } from '@/lib/FetchManga'

import DetailsChapterContent from '@/hooks/pages/manga/chapter/DetailsChapterContent'

import { DetailsMangaProps, ApiResponse } from "@/hooks/pages/manga/chapter/types/ChapterDetails"

export default async function DetailsManga({ params }: DetailsMangaProps) {
    const { slug } = params;
    let mangaResponse: ApiResponse | null = null;
    let error: string | null = null;

    try {
        mangaResponse = await fetchMangaByChapter(slug);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load manga data";
        console.error("Error loading manga chapter:", err);
    }

    if (error || !mangaResponse || !mangaResponse.ok) {
        console.error("Error or invalid response:", { error, response: mangaResponse });
        return (
            <DetailsChapterkelaton />
        );
    }

    const mangaData = mangaResponse.data;

    return (
        <DetailsChapterContent mangaData={mangaData} />
    )
} 