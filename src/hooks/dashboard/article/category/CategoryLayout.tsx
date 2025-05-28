"use client"

import { motion } from 'framer-motion';

import CategoryModal from '@/hooks/dashboard/article/category/CategoryModal';

import CategoryList from '@/hooks/dashboard/article/category/CategoryList';

import { useEffect, useState } from 'react';

import { Category } from '@/hooks/dashboard/article/category/lib/schema';

import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import CategorySkeleton from '@/hooks/dashboard/article/category/CategorySkelaton';

export default function CategoryLayout() {
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        const modal = document.getElementById('category_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handleCloseModal = () => {
        setSelectedCategory(undefined);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE as string), () => {
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <CategorySkeleton />;
    }

    return (
        <section className='min-h-full w-full'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-4 sm:p-6 mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1 w-full sm:w-auto"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='text-xl sm:text-2xl md:text-3xl font-bold'
                    >
                        Category
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                    >
                        Manage and showcase your article categories
                    </motion.p>
                </motion.div>

                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    onClick={() => {
                        const modal = document.getElementById('category_modal') as HTMLDialogElement | null;
                        modal?.showModal();
                    }}
                >
                    <motion.svg
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </motion.svg>
                    Add Category
                </motion.button>
            </motion.div>

            <CategoryModal selectedCategory={selectedCategory} onClose={handleCloseModal} />
            <CategoryList onEdit={handleEdit} />
        </section>
    )
}
