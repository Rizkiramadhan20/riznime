"use client";

import { useAuth } from "@/utils/context/AuthContext";

import { redirect } from "next/navigation";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useEffect, useState, Fragment } from "react";

import { User, Clock, Bookmark, House } from "lucide-react";

const menu = [
    {
        label: "Overview",
        href: "/profile",
        icon: User,
    },
    {
        label: "Settings",
        href: "/profile/settings",
        icon: User,
    },
    {
        label: "History",
        href: "/profile/history",
        icon: Clock,
    },
    {
        label: "Bookmarks",
        href: "/profile/bookmarks",
        icon: Bookmark,
    },
    {
        label: "Back Home",
        href: "/",
        icon: House,
    },
];

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }
        return false;
    });

    // Responsive sidebar
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

    if (!user) {
        redirect("/");
    }

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
                    <div className="mb-10 w-full flex flex-col items-center pt-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white text-3xl font-bold mb-2 shadow-lg">
                            <User className="w-10 h-10" />
                        </div>
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profile Menu</span>
                    </div>
                    <nav className="w-full flex flex-col gap-4 px-4">
                        {menu.map(({ label, href, icon: Icon }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-200
                                        ${active
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"}
                                    `}
                                    aria-current={active ? "page" : undefined}
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                            setIsSidebarOpen(false);
                                        }
                                    }}
                                >
                                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-blue-500 dark:text-blue-400"}`} />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Overlay for mobile */}
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
                            <span className="text-lg font-bold text-[var(--text)]">Profile</span>
                        </div>
                        {/* Right side - Theme toggle placeholder */}
                        <div className="flex items-center gap-2">
                            {/* Add theme toggle or user menu here if needed */}
                        </div>
                    </div>
                    {/* Main children content */}
                    <div className="flex-1 p-4 md:p-8 flex flex-col overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </Fragment>
    );
} 