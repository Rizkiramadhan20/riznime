"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { Article } from '@/hooks/dashboard/article/article/types/schema'

import ArticleModal from '@/hooks/dashboard/article/article/content/ArticleModal'

import ArticleSkeleton from '@/hooks/dashboard/article/article/ArticleSkelaton'

import { useArticles } from '@/hooks/dashboard/article/article/hooks/useArticles'

import ArticleCard from '@/hooks/dashboard/article/article/components/ArticleCard'

import SearchFilter from '@/hooks/dashboard/article/article/components/SearchFilter'

import DeleteModal from '@/hooks/dashboard/article/article/components/DeleteModal'

import ViewModal from '@/hooks/dashboard/article/article/components/ViewModal'

export default function ArticleLayout() {
    const { categories, loading, fetchArticles, handleDelete, filterArticles } = useArticles()
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null)
    const [viewArticle, setViewArticle] = useState<Article | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)

    const openDeleteModal = (id: string) => {
        setDeleteArticleId(id)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setDeleteArticleId(null)
    }

    const confirmDelete = async () => {
        if (deleteArticleId) {
            const success = await handleDelete(deleteArticleId)
            if (success) {
                closeDeleteModal()
            }
        }
    }

    const handleEdit = (article: Article) => {
        setSelectedArticle(article)
        setIsArticleModalOpen(true)
    }

    const handleCloseArticleModal = () => {
        setSelectedArticle(null)
        setIsArticleModalOpen(false)
    }

    const handleAddArticle = () => {
        setSelectedArticle(null)
        setIsArticleModalOpen(true)
    }

    const handleView = (article: Article) => {
        setViewArticle(article)
        setIsViewModalOpen(true)
    }

    const closeViewModal = () => {
        setIsViewModalOpen(false)
        setViewArticle(null)
    }

    const refreshArticles = () => {
        fetchArticles()
    }

    const filteredArticles = filterArticles(searchQuery, selectedCategory, selectedStatus)

    if (loading) {
        return <ArticleSkeleton />
    }

    return (
        <section className='min-h-full'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='text-xl sm:text-2xl md:text-3xl font-bold'
                    >
                        Article
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="text-sm sm:text-base"
                    >
                        Manage and showcase your article
                    </motion.p>
                </motion.div>

                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
                    onClick={handleAddArticle}
                >
                    <motion.svg
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </motion.svg>
                    Add Article
                </motion.button>
            </motion.div>

            <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                categories={categories}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                    />
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 sm:py-12 bg-[var(--card-bg)] rounded-xl shadow-md border border-[var(--border-color)]"
                >
                    <p className="text-sm sm:text-base">No articles found matching your criteria</p>
                </motion.div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />

            <ViewModal
                article={viewArticle}
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
            />

            <ArticleModal
                article={selectedArticle}
                onClose={handleCloseArticleModal}
                onSuccess={refreshArticles}
                show={isArticleModalOpen}
            />
        </section>
    )
}
