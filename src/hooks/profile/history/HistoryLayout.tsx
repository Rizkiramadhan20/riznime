"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { useAuth } from '@/utils/context/AuthContext'

import { useHistory } from './utils/useHistory'

import { HistoryItem } from '@/utils/context/types/Auth'

import Image from 'next/image'

import Link from 'next/link'

import Pagination from '@/base/helper/Pagination'

import HistorySkelaton from "@/hooks/dashboard/history/HistorySkelaton"

export default function HistoryLayout() {
    const { user } = useAuth()
    const { history, loading, error } = useHistory(user?.uid)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filteredHistory = history.filter((item: HistoryItem) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
    const paginatedHistory = filteredHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <HistorySkelaton />
    }

    if (error) {
        return <div className="py-10 text-center text-red-500">{error}</div>
    }

    return (
        <section className="min-h-full">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-xl sm:text-2xl md:text-3xl font-bold"
                    >
                        History
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="text-sm sm:text-base"
                    >
                        Riwayat tontonan kamu
                    </motion.p>
                </motion.div>
                <input
                    type="text"
                    placeholder="Cari judul..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="mt-2 sm:mt-0 px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--card-bg)] text-base"
                />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedHistory.map((item: HistoryItem) => (
                    <Link href={item.href} key={item.episodeId} className="bg-[var(--card-bg)] rounded-xl shadow-md p-4 flex flex-col gap-2 border border-[var(--border-color)] group">
                        <div className="rounded-lg mb-2 aspect-[16/9] overflow-hidden">
                            <Image width={1080} height={1080} src={item.poster} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="font-semibold text-lg line-clamp-1">{item.title}</div>
                        <div className="text-xs text-gray-500">Ditonton pada: {new Date(item.watchedAt).toLocaleString()}</div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {filteredHistory.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 sm:py-12 bg-[var(--card-bg)] rounded-xl shadow-md border border-[var(--border-color)]"
                >
                    <p className="text-sm sm:text-base">Belum ada history yang tersimpan</p>
                </motion.div>
            )}
        </section>
    )
}
