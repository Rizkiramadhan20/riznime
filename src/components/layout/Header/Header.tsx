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
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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
        </>
    )
}