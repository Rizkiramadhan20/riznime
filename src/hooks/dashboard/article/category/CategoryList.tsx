"use client"

import { useEffect, useState } from 'react';

import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import { motion } from 'framer-motion';

import { Category, CategoryListProps } from '@/hooks/dashboard/article/category/lib/schema';

export default function CategoryList({ onEdit }: CategoryListProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        const q = query(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE as string));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const categoriesData: Category[] = [];
            querySnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() } as Category);
            });
            // Sort categories by createdAt in descending order (newest first)
            const sortedCategories = categoriesData.sort((a, b) =>
                b.createdAt.toMillis() - a.createdAt.toMillis()
            );
            setCategories(sortedCategories);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE as string, id));
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
            setCategoryToDelete(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const openDeleteModal = (id: string) => {
        setCategoryToDelete(id);
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
        deleteModal?.showModal();
    };

    const handleEdit = (category: Category) => {
        onEdit(category);
    };

    return (
        <>
            <div className="bg-[var(--card-bg)] rounded-3xl shadow-sm border border-[var(--border-color)]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border-color)]">
                                <th className="text-left py-4 px-6 text-sm font-semibold">
                                    Category Name
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold">
                                    Created At
                                </th>
                                <th className="text-right py-4 px-6 text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <motion.tr
                                    key={`${category.id}-${index}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border-b border-gray-50"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{category.name}</h3>
                                                <p className="text-sm">Category</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm">
                                            {category.createdAt.toDate().toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-2 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                                                title="Edit category"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(category.id)}
                                                className="p-2 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                title="Delete category"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--card-bg)] rounded-3xl shadow-2xl max-w-md w-full p-8"
                    >
                        <h3 className="text-xl font-bold mb-3">Confirm Deletion</h3>
                        <p className="text-sm  mb-8">
                            Are you sure you want to delete this category? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-5 py-2.5 hover:bg-[var(--border-color)] rounded-xl transition-all duration-300 font-medium"
                                onClick={() => {
                                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                    deleteModal?.close();
                                    setCategoryToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isDeleting}
                                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-xl transition-all duration-300 font-medium flex items-center gap-2"
                                onClick={() => categoryToDelete && handleDelete(categoryToDelete)}
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </dialog>
        </>
    );
} 