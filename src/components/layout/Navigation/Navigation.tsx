"use client";

import React, { useState, useEffect } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { House, Search, BookOpen, X, PlayCircle } from "lucide-react"

import Image from 'next/image';

import { AnimeResult } from '@/types/anime';

import { searchAnime } from '@/lib/FetchAnime';

const menuItems = [
    { href: '/', label: 'Anime', icon: House },
    { href: '/donghua', label: 'Donghua', icon: PlayCircle },
    { href: '/manga', label: 'Manga', icon: BookOpen },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<AnimeResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const isLinkActive = (href: string) => {
        if (href === '/') {
            return pathname === href || pathname?.startsWith('/anime/');
        }
        return pathname?.startsWith(href);
    };

    // Debounce search with useEffect
    useEffect(() => {
        if (!showResults) return;
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const handler = setTimeout(async () => {
            try {
                const data = await searchAnime(searchQuery);
                setSearchResults(data.animeList || []);
            } catch {
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery, showResults]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowResults(true);
    };

    const handleResultClick = () => {
        setShowResults(false);
        setIsSearchModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <nav className={`fixed w-[95%] sm:w-[400px] md:w-[500px] mx-auto bottom-2 right-0 left-0 transition-all duration-500 ease-in-out z-50 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}>
                <div className="relative w-full mx-auto px-1 sm:px-2">
                    <div className="absolute inset-0 bg-white/30 dark:bg-black/30 rounded-xl blur-xl transition-all duration-500 ease-in-out"></div>
                    <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-x border-white/20 dark:border-white/10 rounded-xl p-4 shadow-lg transition-all duration-500 ease-in-out">
                        <ul className="flex justify-between items-center gap-1 sm:gap-2">
                            {menuItems.map((item) => (
                                <li key={item.href} className="flex-1">
                                    <Link
                                        href={item.href}
                                        className={`flex flex-col items-center gap-0.5 px-1 sm:px-2 py-2 md:py-1.5 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 group relative overflow-hidden ${isLinkActive(item.href) ? 'bg-white/20 dark:bg-white/10' : ''}`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 transition-all duration-500 ${isLinkActive(item.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
                                        <item.icon
                                            className={`w-6 h-6 transition-all duration-500 ${isLinkActive(item.href)
                                                ? 'text-blue-500 dark:text-blue-400 scale-110 rotate-0'
                                                : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-12'
                                                }`}
                                        />
                                        <span className={`text-[11px] font-medium transition-all duration-500 hidden sm:block ${isLinkActive(item.href)
                                            ? 'text-blue-500 dark:text-blue-400 translate-y-0'
                                            : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5'
                                            }`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                            {/* Search Button */}
                            <li className="flex-1">
                                <button
                                    onClick={() => setIsSearchModalOpen(true)}
                                    className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 group relative overflow-hidden w-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95"></div>
                                    <Search className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                                    <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5 transition-all duration-500 hidden sm:block">Search</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-start justify-center pt-10 sm:pt-20">
                    <div className="bg-[var(--header-bg)] border border-[var(--header-border)] rounded-lg shadow-lg w-[95%] sm:w-full max-w-2xl mx-4">
                        <div className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h2 className="text-base sm:text-lg font-medium text-[var(--text)]">Search Anime</h2>
                                <button
                                    onClick={() => setIsSearchModalOpen(false)}
                                    className="p-1.5 sm:p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text)]" />
                                </button>
                            </div>
                            <div className="relative group w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setShowResults(true)}
                                    placeholder="Search anime..."
                                    className="w-full h-10 sm:h-12 pl-8 sm:pl-10 pr-3 sm:pr-4 bg-transparent text-[var(--text)] placeholder-[var(--text-secondary)] border-b border-[var(--header-border)] focus:border-primary transition-all duration-300 outline-none text-sm"
                                />
                                <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" />
                            </div>
                            {/* Search Results */}
                            {showResults && (searchQuery.trim() !== '' || isLoading) && (
                                <div className="mt-2 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="p-3 sm:p-4 text-center text-[var(--text-secondary)]">
                                            Loading...
                                        </div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="p-3 sm:p-4 text-center text-[var(--text-secondary)]">
                                            No results found
                                        </div>
                                    ) : (
                                        <div className="py-1 sm:py-2">
                                            {searchResults.map((result, index) => (
                                                <Link
                                                    key={index}
                                                    href={`/anime/${result.href}`}
                                                    onClick={handleResultClick}
                                                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer transition-colors duration-200"
                                                >
                                                    <div className="relative w-10 h-14 sm:w-12 sm:h-16 flex-shrink-0">
                                                        <Image
                                                            src={result.poster || '/images/no-image.png'}
                                                            alt={result.title}
                                                            fill
                                                            className="object-cover rounded"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs sm:text-sm font-medium text-[var(--text)] line-clamp-1">
                                                            {result.title}
                                                        </h4>
                                                        <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                                                            <span className="text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                                                {result.type}
                                                            </span>
                                                            <span className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
                                                                Score: {result.score}
                                                            </span>
                                                            <span className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
                                                                {result.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mt-0.5 sm:mt-1">
                                                            {result.genreList.slice(0, 3).map((genre, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-[10px] sm:text-xs text-[var(--text-secondary)] px-1 sm:px-1.5 py-0.5 bg-[var(--hover-bg)] rounded"
                                                                >
                                                                    {genre.title}
                                                                </span>
                                                            ))}
                                                            {result.genreList.length > 3 && (
                                                                <span className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
                                                                    +{result.genreList.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 