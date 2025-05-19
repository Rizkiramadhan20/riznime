"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, User, History, Search, Menu, X } from 'lucide-react'
import Image from "next/image"

import { useAuth } from "@/utils/context/AuthContext"

import LoginModal from "@/components/layout/Header/auth/signin/SignModal"

import ProfileMenu from "@/components/layout/Header/profile/Profile"

import { ThemeToggle } from "@/base/theme/ThemeToggle"

import { AnimeResult } from "@/types/anime"

import { searchAnime } from '@/lib/SearchAnime'

export default function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<AnimeResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const router = useRouter();
    const { user } = useAuth();

    // Handle click outside for search results
    useEffect(() => {
        const handleClickOutside = () => {
            if (showResults) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showResults]);

    // Debounced search function
    const debouncedSearch = useCallback((query: string) => {
        const handler = setTimeout(async () => {
            if (!query.trim()) {
                setSearchResults([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await searchAnime(query);
                setSearchResults(data.animeList);
            } catch (error) {
                console.error('Search failed:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowResults(true);
        debouncedSearch(query);
    };

    const handleResultClick = (href: string) => {
        setShowResults(false);
        router.push(href);
    };

    return (
        <>
            {/* Hamburger Menu */}
            <header className="fixed top-2 left-0 right-0 z-50 px-2">
                <div className='bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-x border-white/20 dark:border-white/10 rounded-xl p-4 shadow-lg z-50 w-20'>
                    <div className="flex items-center justify-center h-full">
                        {/* Hamburger Menu Button - Now visible on all screens */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-[var(--text)]" />
                            ) : (
                                <Menu className="w-6 h-6 text-[var(--text)]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Now used for all screen sizes */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--header-bg)] border border-[var(--header-border)] rounded-lg shadow-lg z-50 max-w-7xl">
                        <div className="p-4 space-y-4">
                            {/* Search Bar */}
                            <div className="relative group w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setShowResults(true)}
                                    placeholder="Search anime..."
                                    className="w-full h-10 pl-10 pr-4 bg-transparent text-[var(--text)] placeholder-[var(--text-secondary)] border-b border-[var(--header-border)] focus:border-primary transition-all duration-300 outline-none text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />

                                {/* Search Results Dropdown */}
                                {showResults && (searchQuery.trim() !== '' || isLoading) && (
                                    <div className="absolute top-full left-0 right-0 w-full mt-2 bg-[var(--header-bg)] border border-[var(--header-border)] rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
                                        {isLoading ? (
                                            <div className="p-4 text-center text-[var(--text-secondary)]">
                                                Loading...
                                            </div>
                                        ) : searchResults.length === 0 ? (
                                            <div className="p-4 text-center text-[var(--text-secondary)]">
                                                No results found
                                            </div>
                                        ) : (
                                            <div className="py-2">
                                                {searchResults.map((result, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleResultClick(result.href)}
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer transition-colors duration-200"
                                                    >
                                                        <div className="relative w-12 h-16 flex-shrink-0">
                                                            <Image
                                                                src={result.poster || '/images/no-image.png'}
                                                                alt={result.title}
                                                                fill
                                                                className="object-cover rounded"
                                                                unoptimized
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-sm font-medium text-[var(--text)] line-clamp-1">
                                                                {result.title}
                                                            </h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                                                    {result.type}
                                                                </span>
                                                                <span className="text-xs text-[var(--text-secondary)]">
                                                                    Score: {result.score}
                                                                </span>
                                                                <span className="text-xs text-[var(--text-secondary)]">
                                                                    {result.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {result.genreList.slice(0, 3).map((genre, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="text-xs text-[var(--text-secondary)] px-1.5 py-0.5 bg-[var(--hover-bg)] rounded"
                                                                    >
                                                                        {genre.title}
                                                                    </span>
                                                                ))}
                                                                {result.genreList.length > 3 && (
                                                                    <span className="text-xs text-[var(--text-secondary)]">
                                                                        +{result.genreList.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* History */}
                            <div className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-300 cursor-pointer">
                                <History className="w-4 h-4 text-[var(--text-secondary)]" />
                                <span className="text-[var(--text)]">History</span>
                            </div>

                            {/* Theme Toggle */}
                            <div className="flex items-center gap-2 px-3 py-2">
                                <span className="text-[var(--text)]">Theme</span>
                                <ThemeToggle />
                            </div>

                            {/* Login/Profile */}
                            {!user ? (
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsLoginModalOpen(true);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </button>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-2">
                                        <div className="relative">
                                            {user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-[var(--header-border)]/50"
                                                    width={32}
                                                    height={32}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-1 ring-[var(--header-bg)]"></span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-[var(--text)]">
                                                {user.displayName}
                                            </span>
                                            <span className="text-xs text-[var(--text-secondary)]">
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Click outside handler for search results and mobile menu */}
            {(showResults || isMobileMenuOpen) && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                        setShowResults(false);
                        setIsMobileMenuOpen(false);
                    }}
                />
            )}

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    )
}