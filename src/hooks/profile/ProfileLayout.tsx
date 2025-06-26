"use client"
import React from 'react'
import { useAuth } from '@/utils/context/AuthContext'
import { useHistory } from '@/hooks/dashboard/history/utils/useHistory'
import { useBookmarks } from '@/hooks/dashboard/bookmarks/utils/useBookmarks'
import Image from 'next/image'
import Link from 'next/link'
import { PlayCircle, Bookmark } from 'lucide-react'

export default function ProfileLayout() {
    const { user } = useAuth();
    const { history, loading: loadingHistory } = useHistory(user?.uid);
    const { bookmarks, loading: loadingBookmarks } = useBookmarks(user?.uid);

    // Sort and take 10 most recent history
    const recentHistory = [...history]
        .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
        .slice(0, 10);
    // Sort and take 10 most recent bookmarks
    const recentBookmarks = [...bookmarks]
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
        .slice(0, 10);

    return (
        <section className="space-y-10">
            {/* Profile Card */}
            <div className="bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur opacity-40" />
                    <div className="relative w-28 h-28 rounded-full border-4 border-transparent bg-gradient-to-tr from-blue-400 to-purple-500 p-1">
                        <Image src={user?.photoURL || '/base/assets/profile.jpg'} width={112} height={112} alt="Profile" className="rounded-full w-28 h-28 object-cover border-4 border-white dark:border-gray-900" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1">{user?.displayName || '-'}</h1>
                    <div className="text-gray-600 dark:text-gray-300 text-lg mb-1 truncate">{user?.email}</div>
                    <div className="text-gray-400 dark:text-gray-500 text-base">{user?.phoneNumber || '-'}</div>
                </div>
            </div>

            {/* History */}
            <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">History Terbaru</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingHistory ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="animate-pulse h-36 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                        ))
                    ) : recentHistory.length === 0 ? (
                        <div className="col-span-full text-gray-400 text-center py-8 flex flex-col items-center gap-4">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="38" stroke="#6366F1" strokeWidth="4" fill="#EEF2FF" />
                                <path d="M28 50V36C28 32.6863 30.6863 30 34 30H46C49.3137 30 52 32.6863 52 36V50" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
                                <rect x="32" y="44" width="16" height="10" rx="2" fill="#6366F1" fillOpacity="0.2" />
                                <circle cx="40" cy="40" r="3" fill="#6366F1" />
                            </svg>
                            Belum ada history.
                        </div>
                    ) : (
                        recentHistory.map(item => (
                            <Link
                                href={item.href}
                                key={item.episodeId}
                                className="group relative flex flex-col justify-between bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-0 shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-blue-400/60"
                                style={{ minHeight: 160 }}
                            >
                                <div className="relative w-full aspect-[16/9] overflow-hidden">
                                    <Image src={item.poster} fill alt={item.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                                    <span className="absolute top-2 left-2 bg-gradient-to-tr from-blue-500 to-purple-500 text-white rounded-full p-1.5 shadow-lg">
                                        <PlayCircle className="w-5 h-5" />
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col justify-between p-4">
                                    <div className="font-semibold text-base line-clamp-1 text-gray-900 dark:text-gray-100 mb-1">
                                        {item.title}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
                                            {new Date(item.watchedAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <span className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-blue-400/60 transition-all duration-300" />
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Bookmarks */}
            <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Bookmarks Terbaru</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingBookmarks ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="animate-pulse h-36 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                        ))
                    ) : recentBookmarks.length === 0 ? (
                        <div className="col-span-full text-gray-400 text-center py-8 flex flex-col items-center gap-4">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="38" stroke="#A21CAF" strokeWidth="4" fill="#F3E8FF" />
                                <path d="M28 24C28 22.8954 28.8954 22 30 22H50C51.1046 22 52 22.8954 52 24V58L40 50L28 58V24Z" stroke="#A21CAF" strokeWidth="3" fill="#A21CAF" fillOpacity="0.15" />
                            </svg>
                            Belum ada bookmark.
                        </div>
                    ) : (
                        recentBookmarks.map(item => (
                            <Link
                                href={item.href}
                                key={item.animeId}
                                className="group relative flex flex-col justify-between bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-0 shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-purple-400/60"
                                style={{ minHeight: 160 }}
                            >
                                <div className="relative w-full aspect-[16/9] overflow-hidden">
                                    <Image src={item.poster} fill alt={item.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                                    <span className="absolute top-2 left-2 bg-gradient-to-tr from-purple-500 to-blue-500 text-white rounded-full p-1.5 shadow-lg">
                                        <Bookmark className="w-5 h-5" />
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col justify-between p-4">
                                    <div className="font-semibold text-base line-clamp-1 text-gray-900 dark:text-gray-100 mb-1">
                                        {item.title}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-medium">
                                            {new Date(item.addedAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <span className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-purple-400/60 transition-all duration-300" />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
