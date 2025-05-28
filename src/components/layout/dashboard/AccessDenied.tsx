import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import AccessDeniedImage from "@/base/assets/dashboard/accest.png";

export default function AccessDenied() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)
                    `,
                    backgroundSize: '40px 40px'
                }}>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-[95%] p-8 md:p-12 bg-background/90 backdrop-blur-xl rounded-2xl shadow-xl relative z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background/50 transition-colors duration-300"
                tabIndex={0}
            >
                <motion.div
                    className="flex-1 flex items-center justify-center"
                    whileHover="hover"
                    variants={imageVariants}
                >
                    <Image
                        src={AccessDeniedImage}
                        alt="Access Denied Illustration"
                        width={500}
                        height={500}
                        className="object-contain w-[300px] md:w-[500px] drop-shadow-2xl"
                        priority
                    />
                </motion.div>

                <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-8">
                    <motion.div
                        variants={itemVariants}
                        className="space-y-3"
                    >
                        <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight transition-colors duration-300">
                            Access Denied
                        </h1>
                        <span className="block text-xl md:text-2xl font-semibold text-primary/90 transition-colors duration-300">
                            403 Forbidden
                        </span>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-text-secondary text-lg md:text-xl font-medium transition-colors duration-300"
                    >
                        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.03, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-xl hover:bg-primary-hover shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                            >
                                <motion.svg
                                    className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:-translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </motion.svg>
                                Kembali ke Beranda
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}