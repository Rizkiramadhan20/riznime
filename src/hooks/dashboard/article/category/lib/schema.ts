import { Timestamp } from "firebase/firestore";

export interface Category {
  id: string;
  name: string;
  createdAt: Timestamp;
}

export interface CategoryListProps {
  onEdit: (category: Category) => void;
}
