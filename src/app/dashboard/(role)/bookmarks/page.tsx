import React from 'react'

import BookmarksLayout from '@/hooks/dashboard/bookmarks/BookmarksLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard Bookmarks | Riznime",
    description: "Halaman dashboard for history",
}

export default function page() {
    return (
        <BookmarksLayout />
    )
}