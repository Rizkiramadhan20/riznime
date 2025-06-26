import React from 'react'

import UserLayout from '@/hooks/dashboard/user/UserLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard User | Riznime",
    description: "Halaman dashboard for history",
}

export default function page() {
    return (
        <UserLayout />
    )
}