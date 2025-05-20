'use client';

import { useTheme } from './ThemeProvider';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // Listen to system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        // Set initial theme based on system preference
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [setTheme]);

    // Urutan mode
    const modes = ['light', 'dark'];
    const modeIcons = {
        light: <span role="img" aria-label="sun" className="text-base">🌤️</span>,
        dark: <span role="img" aria-label="moon" className="text-base">🌙</span>,
    };

    // Index mode saat ini
    const currentIndex = modes.indexOf(theme as 'light' | 'dark');
    // Fungsi untuk pindah ke mode berikutnya
    const nextMode = () => setTheme(modes[(currentIndex + 1) % modes.length] as 'light' | 'dark');

    return (
        <div className="flex flex-col items-center overflow-hidden">
            <button
                onClick={nextMode}
                className="w-20 md:w-24 h-10 md:h-12 rounded-full p-1 flex items-center transition-colors duration-500
                bg-gray-200 dark:bg-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <motion.div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md"
                    layout
                    animate={{
                        x: currentIndex * (window.innerWidth < 640 ? 32 : window.innerWidth < 768 ? 40 : 36),
                        background: theme === 'dark'
                            ? 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)'
                            : 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
                        boxShadow: theme === 'dark'
                            ? '0 2px 8px 0 rgba(99,102,241,0.25)'
                            : '0 2px 8px 0 rgba(0,0,0,0.10)'
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.8
                    }}
                >
                    <motion.span
                        key={theme}
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                            mass: 0.5
                        }}
                        className="text-sm sm:text-base"
                    >
                        {modeIcons[theme as 'light' | 'dark'] ?? modeIcons['light']}
                    </motion.span>
                </motion.div>
            </button>
        </div>
    );
} 