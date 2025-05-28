import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
  description: string;
  status: "draft" | "published";
}

export interface Category {
  id: string;
  categoryArticles: string;
  category: string;
  createdAt: Timestamp;
}

export interface CategoryWithArticles
  extends Omit<Category, "categoryArticles"> {
  categoryArticles: string[];
}
