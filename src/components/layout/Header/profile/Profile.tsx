import Image from "next/image"

import Link from "next/link"

import { motion, AnimatePresence } from 'framer-motion'

import { User } from 'lucide-react'

import { useAuth } from "@/utils/context/AuthContext"

import { Role } from '@/utils/context/types/Auth';

interface ProfileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isMobile?: boolean;
}

export default function ProfileMenu({ isOpen, onClose, isMobile = false }: ProfileMenuProps) {
    const { user, logout, getDashboardUrl } = useAuth();

    if (!user) return null;

    const menuItems = [
        {
            label: 'Profile',
            href: '/profile',
            icon: '👤',
            roles: [Role.USER]
        },
        {
            label: 'Dashboard',
            href: getDashboardUrl(user.role),
            icon: '📊',
            roles: [Role.ADMINS]
        }
    ];

    const availableMenuItems = menuItems.filter(item => item.roles.includes(user.role));

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute ${isMobile ? 'right-0 mt-6' : 'right-0 mt-5'} w-72 bg-background rounded-xl shadow-lg border border-[var(--border-color)] py-2 overflow-hidden`}
                >
                    <motion.div
                        className="px-4 py-3 border-b border-[var(--border-color)]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3">
                            {user.photoURL ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Image
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
                                        width={40}
                                        height={40}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
                                >
                                    <User className="w-5 h-5" />
                                </motion.div>
                            )}
                            <motion.div
                                className="flex-1 min-w-0"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="text-xs font-semibold truncate">{user.displayName}</p>
                                <p className="text-[10px] truncate">{user.email}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="py-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {availableMenuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors duration-200 group"
                                    onClick={onClose}
                                >
                                    <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-[var(--hover-bg)] group-hover:bg-primary group-hover:text-white transition-colors duration-200">{item.icon}</span>
                                    <span className="text-xs group-hover:text-primary transition-colors duration-200">{item.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={async () => {
                                    await logout();
                                    onClose();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors duration-200 group"
                            >
                                <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-[var(--hover-bg)] group-hover:bg-error group-hover:text-white transition-colors duration-200">🚪</span>
                                <span className="text-xs group-hover:text-error transition-colors duration-200">Logout</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 