import React from 'react';
import { useAuth } from '@/utils/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import Image from 'next/image';
import { menuItems } from '@/components/layout/dashboard/header/data/Header';

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function UserHeader({ onSidebarToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        onSidebarToggle(false);
        // Also close any open dropdowns
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        // Remove trailing slashes for comparison
        const normalizedPathname = pathname?.replace(/\/$/, '') ?? '';
        const normalizedHref = href.replace(/\/$/, '');

        // For home page
        if (href === '/') {
            return pathname === href;
        }

        // For dashboard page
        if (normalizedHref === '/dashboard') {
            return normalizedPathname === normalizedHref;
        }

        // For menu items with subItems, only highlight parent if exact match
        const menuItem = menuItems.find(item => item.href === href);
        if (menuItem?.subItems) {
            return normalizedPathname === normalizedHref;
        }

        // For submenu items or regular menu items without subItems
        return normalizedPathname.startsWith(normalizedHref);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <header className="h-full flex flex-col bg-[var(--card-bg)] shadow-[var(--card-shadow)]">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-0 right-0 flex justify-end p-4 lg:hidden">
                <button
                    onClick={() => onSidebarToggle(false)}
                    className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-200"
                >
                    <svg
                        className="w-5 h-5 text-[var(--text-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-4">
                    {user?.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="rounded-xl object-cover w-12 h-12 ring-2 ring-[var(--primary)]/10"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-[var(--hover-bg)] flex items-center justify-center ring-2 ring-[var(--primary)]/10">
                            <User className="w-6 h-6 text-[var(--text-secondary)]" />
                        </div>
                    )}
                    <div>
                        <p className="text-base font-semibold text-[var(--text)]">
                            {user?.displayName}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">@{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 ${isLinkActive(item.href)
                                        ? 'bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/25'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)]'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                            ? 'bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/25'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-200 ${activeDropdown === index ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                        <ul className="mt-2 space-y-1.5 pl-12">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block py-2 px-4 text-sm rounded-lg transition-all duration-200 ${isLinkActive(subItem.href)
                                                            ? 'text-[var(--primary)] font-medium bg-[var(--primary)]/10'
                                                            : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--hover-bg)]'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-[var(--card-border)]">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick();
                    }}
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl text-[var(--error)] hover:bg-[var(--error)]/10 active:bg-[var(--error)]/20 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}