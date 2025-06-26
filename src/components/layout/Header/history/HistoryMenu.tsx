import { motion, AnimatePresence } from 'framer-motion'

import { useAuth } from '@/utils/context/AuthContext'

import { useEffect, useState } from 'react';

import { database } from '@/utils/firebase/firebase';

import { ref, onValue, off, DataSnapshot } from 'firebase/database';

import type { HistoryItem } from '@/utils/context/types/Auth';

import Image from 'next/image';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

interface HistoryMenuProps {
    isOpen: boolean;
    isMobile?: boolean;
    onClose?: () => void;
}

export default function HistoryMenu({ isOpen, isMobile = false, onClose }: HistoryMenuProps) {
    const { user, getDashboardUrl } = useAuth();
    const [history, setHistory] = useState<HistoryItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            setHistory(null);
            return;
        }
        setLoading(true);
        const historyRef = ref(database, `history/${user.uid}`);
        const handleValue = (snapshot: DataSnapshot) => {
            const val = snapshot.val();
            if (val) {
                // Convert object to array and sort by watchedAt desc
                const arr = Object.values(val) as HistoryItem[];
                arr.sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());
                setHistory(arr);
            } else {
                setHistory([]);
            }
            setLoading(false);
        };
        onValue(historyRef, handleValue);
        return () => off(historyRef, 'value', handleValue);
    }, [user]);

    const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(href);
        if (onClose) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute ${isMobile ? 'right-0 mt-6' : 'left-0 mt-5'} w-72 bg-background rounded-xl shadow-lg border border-[var(--border-color)] py-2 overflow-hidden`}
                >
                    <motion.div
                        className="px-4 py-3 border-b border-[var(--border-color)] flex justify-between"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <p className="text-xs font-semibold">History</p>

                        <Link href={user ? getDashboardUrl(user.role) : "/"} className='text-xs font-semibold'>Lihat Details</Link>
                    </motion.div>
                    <motion.div
                        className="p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {user ? (
                            loading ? (
                                <p className="text-sm text-gray-400 text-center">Loading...</p>
                            ) : history && history.length > 0 ? (
                                <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                    {history.map(item => (
                                        <li key={item.episodeId} className="group flex items-center gap-3 bg-[var(--card-bg,theme(colors.gray.50))] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 p-2 cursor-pointer hover:bg-[var(--hover-bg,theme(colors.gray.100))]">
                                            <div className="relative">
                                                <Image width={1080} height={1080} src={item.poster} alt={item.title} className="w-12 h-16 object-cover rounded-md border" />
                                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <svg className="w-7 h-7 text-primary drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link href={item.href} className="block font-semibold text-sm truncate text-[var(--text)] hover:underline" title={item.title} onClick={handleLinkClick(item.href)}>{item.title}</Link>
                                                <span className="block text-xs text-gray-400 mt-1 font-mono tracking-tight">{new Date(item.watchedAt).toLocaleString()}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-400 text-center">Belum ada riwayat tontonan.</p>
                            )
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-5 h-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                </svg>
                                <p className="text-sm leading-relaxed text-red-500 dark:text-red-400 text-center">
                                    Silakan login untuk melihat riwayat tontonan.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 