import React from 'react';

import { Metadata } from 'next';

import DaftarAnimeLayout from "@/hooks/pages/daftar-anime/DaftarAnimeLayout"

export const metadata: Metadata = {
    title: 'Daftar Anime | Riznime',
    description: 'Daftar Anime berdasarkan Number,Abjad,A-Z,Z-A',
}

export default function DaftarAnime() {
    return (
        <DaftarAnimeLayout />
    )
}
