"use client"

import React, { useState } from 'react'

import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'

import Link from "next/link"

import { motion } from 'framer-motion'

import { ThemeToggle } from '@/base/theme/ThemeToggle'

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className='fixed flex gap-2 z-50 justify-end items-center w-full px-4 py-4'>
                <ThemeToggle />

                <header className="relative">
                    {/* Hamburger Menu */}
                    <div className='w-12 h-12 rounded-full p-1 flex items-center transition-colors duration-500
                    bg-gray-200 dark:bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400'>
                        <div className="flex items-center justify-center h-full w-full">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-full h-full flex items-center justify-center rounded-full transition-all duration-300"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)]" />
                                ) : (
                                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)]" />
                                )}
                            </button>
                        </div>
                    </div>
                </header>
            </div>
            {/* Full Screen Modal Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur z-[200] flex flex-col">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-8 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </button>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col sm:flex-row w-full">
                        {/* Left: Menu & Address */}
                        <div className="flex flex-col justify-between w-full sm:max-w-[520px] px-6 sm:pl-16 sm:pr-8 py-8 sm:py-12">
                            <nav className="flex flex-col gap-6 sm:gap-8 justify-center flex-1">
                                {[
                                    { name: 'Daftar Anime', href: '/daftar-anime' },
                                    { name: 'Daftar Manga', href: '/daftar-manga' },
                                    { name: 'Jadwal Rilis', href: '/jadwal-rilis' },
                                    { name: 'Artikel', href: '/articles' },
                                    { name: 'History', href: '#' },
                                ].map((item) => (
                                    <motion.li key={item.href} className="list-none overflow-hidden">
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block relative overflow-hidden group"
                                        >
                                            <motion.span
                                                className="flex items-center text-2xl sm:text-3xl font-light py-2 transition-all duration-300 ease-in-out transform group-hover:-translate-y-full text-white"
                                            >
                                                {item.name}
                                            </motion.span>
                                            <motion.span
                                                className="absolute top-full left-0 flex items-center text-2xl sm:text-3xl font-semibold py-2 transition-all duration-300 ease-in-out transform group-hover:-translate-y-full text-primary"
                                            >
                                                {item.name}
                                            </motion.span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </nav>
                        </div>
                        {/* Right: Social Media */}
                        <div className="flex-1 flex flex-col justify-center items-center sm:items-end px-6 sm:px-0 sm:pr-24 py-8 sm:py-0">
                            <div className="flex flex-row sm:flex-col gap-4 sm:gap-5">
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors"><Facebook className="w-5 h-5 sm:w-6 sm:h-6" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors"><Instagram className="w-5 h-5 sm:w-6 sm:h-6" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors"><Twitter className="w-5 h-5 sm:w-6 sm:h-6" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors"><Linkedin className="w-5 h-5 sm:w-6 sm:h-6" /></a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors"><Youtube className="w-5 h-5 sm:w-6 sm:h-6" /></a>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="flex justify-between items-center w-full px-6 sm:px-16 pb-6 text-xs text-white/50">
                        <span></span>
                        <span>&copy; 2025 Space Digitalia</span>
                    </div>
                </div>
            )}
        </>
    )
}