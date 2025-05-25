"use client"

import React, { useState } from 'react'

import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Twitter, LogIn } from 'lucide-react'

import Link from "next/link"

import { motion } from 'framer-motion'

import { ThemeToggle } from '@/base/theme/ThemeToggle'

import LoginModal from '@/components/layout/Header/auth/signin/SignModal'

import ProfileMenu from '@/components/layout/Header/profile/Profile'

import { useAuth } from '@/utils/context/AuthContext'

import Image from 'next/image'

import { useModalEffect } from '@/base/helper/useModalEffect'

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user } = useAuth();

    useModalEffect(isMobileMenuOpen || isLoginModalOpen);

    return (
        <>
            <div className='fixed flex items-center justify-between w-full px-4 py-4 z-50'>
                {/* Left side - Menu */}
                <header className="relative">
                    <div className='flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-500
                    bg-gray-200 dark:bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400'>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex items-center gap-2 transition-all duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)]" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)]" />
                                    <span className="text-[11px] font-medium text-[var(--text)]">Menu</span>
                                </div>
                            )}
                        </button>
                    </div>
                </header>

                {/* Right side - Theme and Login/Profile */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    {/* Login/Profile Button */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 bg-gray-200 dark:bg-gray-700 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95"></div>
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        width={500} height={500}
                                        alt="Profile"
                                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center">
                                        <span className="text-[10px] font-medium text-white">
                                            {user.displayName?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <span className="text-[11px] font-medium text-[var(--text)] group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5 transition-all duration-500">
                                    {user.displayName}
                                </span>
                            </button>
                            <ProfileMenu
                                isOpen={isProfileMenuOpen}
                                onClose={() => setIsProfileMenuOpen(false)}
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 bg-gray-200 dark:bg-gray-700 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 dark:from-blue-400/20 dark:to-blue-300/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95"></div>
                            <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)] group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                            <span className="text-[11px] font-medium text-[var(--text)] group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5 transition-all duration-500">Login</span>
                        </button>
                    )}
                </div>
            </div>
            {/* Full Screen Modal Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur z-[200] flex flex-col">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-10 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col w-full">
                        {/* Menu Items */}
                        <div className="flex-1 flex flex-col justify-center px-4 py-8">
                            <nav className="flex flex-col gap-4">
                                {[
                                    { name: 'Daftar Anime', href: '/daftar-anime' },
                                    { name: 'Artikel', href: '/articles' },
                                ].map((item) => (
                                    <motion.li key={item.href} className="list-none overflow-hidden">
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block relative overflow-hidden group"
                                        >
                                            <motion.span
                                                className="flex items-center text-xl font-light py-1.5 transition-all duration-300 ease-in-out transform group-hover:-translate-y-full text-white"
                                            >
                                                {item.name}
                                            </motion.span>
                                            <motion.span
                                                className="absolute top-full left-0 flex items-center text-xl font-semibold py-1.5 transition-all duration-300 ease-in-out transform group-hover:-translate-y-full text-primary"
                                            >
                                                {item.name}
                                            </motion.span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </nav>
                        </div>

                        {/* Social Media */}
                        <div className="flex justify-center items-center px-4 py-6">
                            <div className="flex gap-3">
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"><Youtube className="w-4 h-4" /></a>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center items-center w-full px-4 py-4 text-xs text-white/50">
                        <span>&copy; 2025 Space Digitalia</span>
                    </div>
                </div>
            )}

            {isLoginModalOpen && (
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            )}
        </>
    )
}