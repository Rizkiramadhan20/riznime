import React from 'react'

import SuperAdminsLayout from '@/hooks/dashboard/SuperAdminLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard Super Admin | Anime Indo",
    description: "Halaman dashboard for super admin",
}

export default function page() {
    return (
        <SuperAdminsLayout />
    )
}