'use client';

import { useTheme } from './ThemeProvider';
import { Button } from 'flowbite-react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div>
                <Button
                    pill
                    className="p-2 relative w-12 h-12 transition-all duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="relative w-6 h-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center text-[var(--text-secondary)]"
                            >
                                {theme === 'dark' ? (
                                    <Moon className="h-6 w-6" />
                                ) : theme === 'light' ? (
                                    <Sun className="h-6 w-6" />
                                ) : (
                                    <Monitor className="h-6 w-6" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="theme-menu"
                        tabIndex={-1}
                    >
                        <div className="py-1.5 px-1" role="none">
                            <motion.button
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setTheme('light');
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${theme === 'light'
                                    ? 'bg-gray-100/80 dark:bg-gray-700/80 text-[var(--text-secondary)]'
                                    : 'text-[var(--text-secondary)] hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                    }`}
                                role="menuitem"
                                tabIndex={-1}
                            >
                                <div className="flex items-center">
                                    <Sun className="h-5 w-5 mr-3 text-[var(--text-secondary)]" />
                                    Light
                                </div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setTheme('dark');
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${theme === 'dark'
                                    ? 'bg-gray-100/80 dark:bg-gray-700/80 text-[var(--text-secondary)]'
                                    : 'text-[var(--text-secondary)] hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                    }`}
                                role="menuitem"
                                tabIndex={-1}
                            >
                                <div className="flex items-center">
                                    <Moon className="h-5 w-5 mr-3 text-[var(--text-secondary)]" />
                                    Dark
                                </div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setTheme('system');
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${theme === 'system'
                                    ? 'bg-gray-100/80 dark:bg-gray-700/80 text-[var(--text-secondary)]'
                                    : 'text-[var(--text-secondary)] hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                    }`}
                                role="menuitem"
                                tabIndex={-1}
                            >
                                <div className="flex items-center">
                                    <Monitor className="h-5 w-5 mr-3 text-[var(--text-secondary)]" />
                                    System
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 