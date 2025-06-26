import React from 'react'

import HistoryLayout from '@/hooks/dashboard/history/HistoryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "History | Riznime",
    description: "Halaman dashboard for history",
}

export default function page() {
    return (
        <HistoryLayout />
    )
}