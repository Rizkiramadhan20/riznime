import React from 'react'

import Link from 'next/link'

import { Github, Youtube, Instagram, Facebook } from 'lucide-react'

import { FaTiktok } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-[var(--card-border)]">
            <div className="container px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[var(--text)]">RizNime</h3>
                        <p className="text-[var(--text-secondary)]">
                            Your ultimate destination for anime streaming, news, and community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[var(--text)]">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link href="/donghua" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    Donghua
                                </Link>
                            </li>
                            <li>
                                <Link href="/manga" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    Manga
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[var(--text)]">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/dmca" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    DMCA
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[var(--text)]">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/Rizkiramadhan20" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                <Github size={24} />
                            </a>
                            <a href="https://www.instagram.com/rzkir.20" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.youtube.com/@codingwithrizki" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                <Youtube size={24} />
                            </a>
                            <a href="https://www.facebook.com/rizki.ramadhan.419859" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="https://www.tiktok.com/@rzkir.20" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                <FaTiktok size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 mt-8 border-t border-[var(--card-border)]">
                    <p className="text-center text-[var(--text-secondary)]">
                        © 2025 <Link href={"https://rizkiramadhan.web.id"}>Rizki Ramadhan</Link>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
