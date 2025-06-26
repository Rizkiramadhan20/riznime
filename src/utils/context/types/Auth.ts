export enum Role {
  ADMINS = "admins",
  USER = "user",
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  photoURL?: string;
  updatedAt: Date;
  isActive: boolean;
  createdAt: Date;
  phoneNumber: string;
}

export interface HistoryItem {
  animeId: string;
  episodeId: string;
  title: string;
  poster: string;
  href: string;
  watchedAt: string; // ISO string
}

export interface BookmarkItem {
  animeId: string;
  title: string;
  poster: string;
  href: string;
  addedAt: string; // ISO string
}

export interface AuthContextType {
  user: UserAccount | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserAccount>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
  getDashboardUrl: (userRole: string) => string;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  showInactiveModal: boolean;
  setShowInactiveModal: (show: boolean) => void;
  removeFromBookmarks: (bookmarkId: string) => Promise<boolean>;
  signInWithProvider: (providerName: "google" | "github") => Promise<void>;
  addToHistory: (item: Omit<HistoryItem, "watchedAt">) => Promise<void>;
  addToBookmarks: (item: Omit<BookmarkItem, "addedAt">) => Promise<void>;
  getBookmarkByAnimeId: (animeId: string) => Promise<BookmarkItem | null>;
  toggleBookmark: (item: Omit<BookmarkItem, "addedAt">) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}
