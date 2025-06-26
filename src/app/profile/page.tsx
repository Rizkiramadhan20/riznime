import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from "@/hooks/profile/ProfileLayout"

export const metadata: Metadata = {
    title: 'Profile | Riznime',
    description: 'Perbarui data - data anda yang belum di perbarui.',
}

export default function Profile() {

    return (
        <ProfileLayout />
    )
}