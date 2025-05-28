import React from 'react'

import ArticleLayout from '@/hooks/dashboard/article/article/ArticleLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard Article | Anime Indo",
    description: "Halaman dashboard for article",
}

export default function page() {
    return (
        <ArticleLayout />
    )
}