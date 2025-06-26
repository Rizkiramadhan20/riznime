"use client"

import React, { useState } from 'react'
import { DaftarAnime } from '@/interface/anime'
import { Search } from 'lucide-react'

export interface DaftarAnimeProps {
    animeData: {
        statusCode: number;
        statusMessage: string;
        message: string;
        ok: boolean;
        data: {
            list: {
                startWith: string;
                animeList: DaftarAnime[];
            }[];
        };
        pagination: null;
    };
}

export default function DaftarAnimeContent({ animeData }: DaftarAnimeProps) {
    const [filter, setFilter] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredGroups = animeData.data.list.filter(group =>
        group.startWith.toLowerCase().includes(filter.toLowerCase())
    )

    const numbers = '123456789'.split('')
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    const filteredAnimeList = filteredGroups.map(group => ({
        ...group,
        animeList: group.animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(group => group.animeList.length > 0)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-8">
                        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                            Daftar Anime
                        </h1>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-text-secondary" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari anime..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-col gap-2 p-4 bg-card-bg rounded-xl shadow-card">
                            <div
                                onClick={() => setFilter('')}
                                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${filter === ''
                                    ? 'bg-primary text-background shadow-md scale-105'
                                    : 'bg-hover hover:bg-primary/10 hover:scale-105 text-text'
                                    }`}
                            >
                                All
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {numbers.map((number) => (
                                    <div
                                        key={number}
                                        onClick={() => setFilter(number)}
                                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${filter === number
                                            ? 'bg-primary text-background shadow-md scale-105'
                                            : 'bg-hover hover:bg-primary/10 hover:scale-105 text-text'
                                            }`}
                                    >
                                        {number}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {alphabet.map((letter) => (
                                    <div
                                        key={letter}
                                        onClick={() => setFilter(letter)}
                                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${filter === letter
                                            ? 'bg-primary text-background shadow-md scale-105'
                                            : 'bg-hover hover:bg-primary/10 hover:scale-105 text-text'
                                            }`}
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAnimeList.map((group) => (
                            <div key={`group-${group.startWith}`} className="space-y-4">
                                <h2 className="text-2xl font-semibold px-2 border-b border-border pb-2 text-text sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                                    {group.startWith}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {group.animeList.map((anime, index) => (
                                        <a
                                            key={`${group.startWith}-${anime.title}-${index}`}
                                            href={anime.href}
                                            className="block p-4 bg-card-bg hover:bg-hover rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border border-border group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-200"></div>
                                                <h3 className="font-medium text-text group-hover:text-primary transition-colors duration-200 line-clamp-1">
                                                    {anime.title}
                                                </h3>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAnimeList.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-text-secondary text-lg">
                                Tidak ada anime yang ditemukan
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}