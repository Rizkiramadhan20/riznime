"use client"

import React, { useState } from 'react'

import { LogIn } from 'lucide-react'

import { ThemeToggle } from '@/base/theme/ThemeToggle'

import LoginModal from '@/components/layout/Header/auth/signin/SignModal'

import ProfileMenu from '@/components/layout/Header/profile/Profile'

import { useAuth } from '@/utils/context/AuthContext'

import Image from 'next/image'

import { useModalEffect } from '@/base/helper/useModalEffect'

export default function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user } = useAuth();

    useModalEffect(isLoginModalOpen);

    return (
        <>
            <div className='fixed flex items-end justify-end w-full px-4 py-4 z-50'>
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

            {isLoginModalOpen && (
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            )}
        </>
    )
}