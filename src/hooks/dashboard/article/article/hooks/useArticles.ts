"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import {
  Article,
  Category,
} from "@/hooks/dashboard/article/article/types/schema";
import { Timestamp } from "firebase/firestore";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES!)
      );
      const articlesData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Article)
      );
      // Sort articles by createdAt in descending order (newest first)
      const sortedArticles = articlesData.sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      );
      setArticles(sortedArticles);

      // Extract unique categories from articles
      const uniqueCategoriesFromArticles = Array.from(
        new Set(articlesData.map((article) => article.category))
      ).filter(Boolean);

      // Create category objects from the extracted categories
      const extractedCategories = uniqueCategoriesFromArticles.map(
        (categoryName) => ({
          id: categoryName, // Use category name as ID
          category: categoryName,
          categoryArticles: "",
          createdAt: { toDate: () => new Date() } as unknown as Timestamp,
        })
      );

      setCategories(extractedCategories);
    } catch {
      // Error handling without console.error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES!, id)
      );
      setArticles(articles.filter((article) => article.id !== id));
      return true;
    } catch {
      // Error handling without console.error
      return false;
    }
  };

  const filterArticles = (
    searchQuery: string,
    selectedCategory: string,
    selectedStatus: string
  ) => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author?.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Handle category filtering - directly compare with the category name
      const matchesCategory = selectedCategory
        ? article.category === selectedCategory
        : true;

      const matchesStatus = selectedStatus
        ? article.status === selectedStatus
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    categories,
    loading,
    fetchArticles,
    handleDelete,
    filterArticles,
  };
};
