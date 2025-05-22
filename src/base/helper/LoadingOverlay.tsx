"use client"

import React, { useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
    isLoading: boolean;
    message?: string;
    progress?: number; // 0-100
}

const LoadingSpinner = () => (
    <svg
        width="60"
        height="60"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600 dark:text-blue-400"
    >
        <motion.path
            d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm0 42c-10.5 0-19-8.5-19-19S14.5 6 25 6s19 8.5 19 19-8.5 19-19 19z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{
                pathLength: 1,
                rotate: 360,
            }}
            transition={{
                pathLength: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
        />
        <motion.circle
            cx="25"
            cy="25"
            r="8"
            fill="currentColor"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    </svg>
);

const ProgressBar = ({ progress }: { progress?: number }) => {
    if (progress === undefined) return null;

    return (
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-blue-600 dark:bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

export default function LoadingOverlay({ isLoading, message = "Loading...", progress }: LoadingOverlayProps) {
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] w-full h-full"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center gap-6 p-6 rounded-2xl"
                    >
                        <div className="relative">
                            <LoadingSpinner />
                            <motion.div
                                className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-full blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full">
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-700 dark:text-gray-300 font-medium text-lg text-center"
                            >
                                {message}
                            </motion.p>
                            <ProgressBar progress={progress} />
                            {progress !== undefined && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    {progress}%
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 