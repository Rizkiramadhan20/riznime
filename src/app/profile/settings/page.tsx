import React from 'react'

import SettingsLayout from '@/hooks/profile/settings/SettingsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Settings | Riznime",
    description: "Halaman dashboard for setings",
}

export default function page() {
    return (
        <SettingsLayout />
    )
}