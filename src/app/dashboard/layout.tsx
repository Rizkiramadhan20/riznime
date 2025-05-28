"use client";

import { useAuth } from "@/utils/context/AuthContext";

import { Role } from "@/utils/context/types/Auth";

import { useEffect, useState, Fragment } from "react";

import SuperAdminHeader from "@/components/layout/dashboard/header/Header";

import UserHeader from "@/components/layout/dashboard/header/Header";

import AccessDenied from "@/components/layout/dashboard/AccessDenied";

import { ThemeToggle } from '@/base/theme/ThemeToggle'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Check if window exists (client-side) and set initial state based on screen width
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024; // 1024px is the 'lg' breakpoint in Tailwind
        }
        return false; // Default to closed on server-side
    });
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
            return;
        }

        // Get current path
        const currentPath = window.location.pathname;

        // Check role priority and validate access
        if (currentPath.startsWith('/dashboard')) {
            if (!hasRole(Role.SUPER_ADMIN)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.SUPER_ADMIN);
        } else if (currentPath.startsWith('/')) {
            if (!hasRole(Role.USER)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.USER);
        } else {
            window.location.href = '/';
            return;
        }

        setIsAuthorized(true);
        setLoading(false);
    }, [hasRole, user]);

    // Add resize listener to handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return null;
    }

    if (!isAuthorized) {
        return <AccessDenied />;
    }

    const renderHeader = () => {
        switch (currentRole) {
            case Role.SUPER_ADMIN:
                return <SuperAdminHeader onSidebarToggle={setIsSidebarOpen} />;
            case Role.USER:
                return <UserHeader onSidebarToggle={setIsSidebarOpen} />;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <div className="flex h-screen bg-[var(--background)] overflow-hidden">
                {/* Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 lg:relative
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 transition-all duration-300 ease-in-out
                    w-72 lg:w-[280px] bg-[var(--card-bg)] z-30
                    border-r border-[var(--card-border)] shadow-[var(--card-shadow)]
                    flex flex-col
                `}>
                    {renderHeader()}
                </aside>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-[var(--text)]/60 backdrop-blur-sm lg:hidden z-20"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                    {/* Top Navigation Bar */}
                    <div className="sticky top-0 z-20 h-16 bg-[var(--header-bg)] border-b border-[var(--header-border)] flex items-center justify-between px-4 lg:px-6 backdrop-blur-sm">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-200"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <svg
                                    className="w-6 h-6 text-[var(--text-secondary)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isSidebarOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-[300px] h-10 px-4 text-sm rounded-lg bg-[var(--hover-bg)] border-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 text-[var(--text)] placeholder-[var(--text-secondary)]"
                                />
                                <svg
                                    className="w-5 h-5 text-[var(--text-secondary)] absolute right-4 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Right side - Messages and Notifications */}
                        <div className="flex items-center gap-2">
                            {/* Messages */}
                            <button className="relative group">
                                <div className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-200">
                                    <svg
                                        className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full ring-2 ring-[var(--card-bg)]"></span>
                                </div>
                            </button>

                            {/* Notifications */}
                            <button className="relative group">
                                <div className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-200">
                                    <svg
                                        className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full ring-2 ring-[var(--card-bg)]"></span>
                                </div>
                            </button>

                            {/* Theme Toggle */}
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 py-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
} 