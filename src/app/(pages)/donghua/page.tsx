"use client"

import React from 'react'
import Link from 'next/link'
import { Construction, ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DonghuaPage() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    }

    const iconVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            rotate: -180
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
                type: "spring" as const,
                stiffness: 200
            }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                duration: 0.3,
                ease: "easeOut" as const
            }
        },
        tap: {
            scale: 0.95
        }
    }

    const featureCardVariants = {
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut" as const
            }
        }
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Icon dan Header */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <motion.div
                            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
                            variants={iconVariants}
                        >
                            <Construction className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4"
                            variants={itemVariants}
                        >
                            Halaman Donghua
                        </motion.h1>
                        <motion.p
                            className="text-xl text-slate-600 dark:text-slate-300"
                            variants={itemVariants}
                        >
                            Platform streaming anime dan donghua terbaik
                        </motion.p>
                    </motion.div>

                    {/* Pesan Perbaikan */}
                    <motion.div
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-200 dark:border-slate-700"
                        variants={itemVariants}
                        whileHover={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <motion.div
                            className="flex items-center justify-center mb-4"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4"
                                variants={iconVariants}
                            >
                                <Construction className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                    Sedang Dalam Perbaikan
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Mohon maaf atas ketidaknyamanannya
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
                            variants={itemVariants}
                        >
                            Tim kami sedang bekerja keras untuk memberikan pengalaman terbaik dalam menikmati layanan donghua.
                            Kami berkomitmen untuk menghadirkan konten berkualitas tinggi dengan teknologi terkini.
                        </motion.p>
                    </motion.div>

                    {/* Fitur yang Tersedia */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-6 mb-8"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                            variants={featureCardVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                variants={iconVariants}
                            >
                                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </motion.div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                                Koleksi Lengkap
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Ribuan judul anime dan donghua dari berbagai genre
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                            variants={featureCardVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                variants={iconVariants}
                            >
                                <div className="w-6 h-6 bg-green-600 dark:bg-green-400 rounded-full"></div>
                            </motion.div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                                Kualitas HD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Streaming dengan resolusi tinggi dan audio berkualitas
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                            variants={featureCardVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                variants={iconVariants}
                            >
                                <div className="w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded-lg"></div>
                            </motion.div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                                Update Rutin
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Episode baru setiap minggu dengan subtitle Indonesia
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Tombol Navigasi */}
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="/anime"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Jelajahi Halaman Anime
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>

                        <motion.p
                            className="text-sm text-slate-500 dark:text-slate-400"
                            variants={itemVariants}
                        >
                            Sementara menunggu, nikmati koleksi anime kami yang sudah tersedia
                        </motion.p>
                    </motion.div>

                    {/* Footer Info */}
                    <motion.div
                        className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
                        variants={itemVariants}
                    >
                        <p className="text-slate-500 dark:text-slate-400">
                            © 2024 RizNime. Semua hak cipta dilindungi.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
