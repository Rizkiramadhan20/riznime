import React from 'react'

import ArticleCategoryLayout from '@/hooks/dashboard/article/category/CategoryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard Article Category | Anime Indo",
    description: "Halaman dashboard for article category",
}

export default function page() {
    return (
        <ArticleCategoryLayout />
    )
}