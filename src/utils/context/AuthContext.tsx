"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { Role, UserAccount, AuthContextType, HistoryItem, BookmarkItem } from '@/utils/context/types/Auth';

import { auth, db, database } from '@/utils/firebase/firebase';

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';

import { ref, set, remove, get } from 'firebase/database';

import toast from 'react-hot-toast';

import Cookies from 'js-cookie';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [showInactiveModal, setShowInactiveModal] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    const getDashboardUrl = (userRole: string) => {
        switch (userRole) {
            case Role.ADMINS:
                return `/dashboard`;
            case Role.USER:
                return `/profile`;
            default:
                return '/';
        }
    };

    const handleRedirect = (userData: UserAccount) => {
        // Check if there's a saved redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin'); // Clear the saved URL
            router.push(redirectUrl);
            return;
        }

        // For regular users - redirect to home
        if (userData.role === Role.USER) {
            router.push('/');
            return;
        }

        // For other roles, redirect to their dashboard
        const dashboardUrl = getDashboardUrl(userData.role);
        router.push(dashboardUrl);
    };

    const signInWithProvider = async (providerName: 'google' | 'github') => {
        const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            const userDocRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            let userData: UserAccount;

            if (userDoc.exists()) {
                // User exists, get their data
                userData = userDoc.data() as UserAccount;

                if (!userData.isActive) {
                    setShowInactiveModal(true);
                    await signOut(auth);
                    return;
                }
            } else {
                // New user, create a new document
                userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    role: Role.USER,
                    photoURL: firebaseUser.photoURL || '',
                    phoneNumber: firebaseUser.phoneNumber || '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true,
                };
                await setDoc(userDocRef, userData);
            }

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            Cookies.set('role', userData.role, { expires: 7 });
            const welcomeMessage = getWelcomeMessage(userData);
            toast.success(welcomeMessage);
            handleRedirect(userData);

        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Login dengan ${providerName} gagal: ${error.message}`);
            } else {
                toast.error(`Terjadi kesalahan saat login dengan ${providerName}`);
            }
            throw error;
        }
    };

    const addToHistory = async (item: Omit<HistoryItem, 'watchedAt'>) => {
        if (!user) return;

        try {
            const historyItem: HistoryItem = {
                ...item,
                watchedAt: new Date().toISOString(),
            };
            await set(ref(database, `${process.env.NEXT_PUBLIC_DATABASE_HISTORY}/${user.uid}/${item.episodeId}`), historyItem);
        } catch (error) {
            console.error("Failed to add to history:", error);
        }
    };

    const login = async (email: string, password: string): Promise<UserAccount> => {
        try {
            if (!email || !password) {
                throw new Error('Email dan password harus diisi');
            }

            const emailString = String(email).trim();
            const userCredential = await signInWithEmailAndPassword(auth, emailString, password);

            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, userCredential.user.uid));
            const userData = userDoc.data() as UserAccount;

            if (!userData) {
                throw new Error('User account not found');
            }

            // Check if user account is inactive
            if (!userData.isActive) {
                setShowInactiveModal(true);
                await signOut(auth);
                return userData; // Return userData but don't proceed with login
            }

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            Cookies.set('role', userData.role, { expires: 7 });
            const welcomeMessage = getWelcomeMessage(userData);
            toast.success(welcomeMessage);
            handleRedirect(userData);

            return userData;
        } catch (error) {
            if (error instanceof Error) {
                // Check if the error is due to disabled account
                if (error.message.includes('auth/user-disabled')) {
                    setShowInactiveModal(true);
                } else {
                    toast.error('Login gagal: ' + error.message);
                }
            } else {
                toast.error('Terjadi kesalahan saat login');
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('user');
            // Hapus semua cookies
            document.cookie.split(';').forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, '')
                    .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
            });
            // Hapus role dari cookies
            Cookies.remove('role');
            toast.success('Anda berhasil logout');
        } catch {
            toast.error('Terjadi kesalahan saat logout');
        }
    };

    const deleteAccount = async () => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }

            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                throw new Error('Failed to get authentication token');
            }

            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }

            setUser(null);
            toast.success('Akun berhasil dihapus');
            router.push('/');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus akun');
            throw error;
        }
    };

    const hasRole = (roles: string | string[]): boolean => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const getWelcomeMessage = (userData: UserAccount): string => {
        const { displayName } = userData;
        return `Selamat datang, ${displayName}!`;
    };

    const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
        try {
            if (!email || !password || !displayName) {
                throw new Error('Semua field harus diisi');
            }

            const emailString = String(email).trim();
            const userCredential = await createUserWithEmailAndPassword(auth, emailString, password);

            const userData: UserAccount = {
                uid: userCredential.user.uid,
                email: emailString,
                displayName: displayName,
                role: Role.USER,
                photoURL: '',
                phoneNumber: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true
            };

            await setDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, userCredential.user.uid), userData);
            toast.success('Akun berhasil dibuat');
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Gagal membuat akun: ' + error.message);
            } else {
                toast.error('Terjadi kesalahan saat membuat akun');
            }
            throw error;
        }
    };

    const forgotPassword = async (email: string): Promise<void> => {
        try {
            if (!email) {
                throw new Error('Email harus diisi');
            }

            const emailString = String(email).trim();
            await sendPasswordResetEmail(auth, emailString);
            toast.success('Link reset password telah dikirim ke email Anda');
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Gagal mengirim reset password: ' + error.message);
            } else {
                toast.error('Terjadi kesalahan saat mengirim reset password');
            }
            throw error;
        }
    };

    const removeFromBookmarks = async (bookmarkId: string): Promise<boolean> => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }

            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                throw new Error('Failed to get authentication token');
            }

            const response = await fetch(`/api/user/bookmarks/${bookmarkId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to remove bookmark');
            }

            toast.success('Bookmark berhasil dihapus');
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus bookmark');
            return false;
        }
    };

    const addToBookmarks = async (item: Omit<BookmarkItem, 'addedAt'>) => {
        if (!user) return;
        try {
            const bookmarkItem: BookmarkItem = {
                ...item,
                addedAt: new Date().toISOString(),
            };
            await set(ref(database, `${process.env.NEXT_PUBLIC_DATABASE_BOOKMARKS}/${user.uid}/${item.animeId}`), bookmarkItem);
            toast.success('Berhasil menambahkan ke bookmark!');
        } catch (error) {
            console.error('Failed to add to bookmarks:', error);
            toast.error('Gagal menambahkan ke bookmark!');
        }
    };

    const getBookmarkByAnimeId = async (animeId: string): Promise<BookmarkItem | null> => {
        if (!user) return null;
        try {
            const snapshot = await get(ref(database, `${process.env.NEXT_PUBLIC_DATABASE_BOOKMARKS}/${user.uid}/${animeId}`));
            if (snapshot.exists()) {
                return snapshot.val() as BookmarkItem;
            }
            return null;
        } catch {
            return null;
        }
    };

    const toggleBookmark = async (item: Omit<BookmarkItem, 'addedAt'>) => {
        if (!user) return;
        const existing = await getBookmarkByAnimeId(item.animeId);
        if (existing) {
            // Remove
            await remove(ref(database, `${process.env.NEXT_PUBLIC_DATABASE_BOOKMARKS}/${user.uid}/${item.animeId}`));
            toast.success('Bookmark dihapus!');
        } else {
            // Add
            await addToBookmarks(item);
        }
    };

    const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
        if (!auth.currentUser || !user) {
            toast.error('User not authenticated');
            throw new Error('User not authenticated');
        }
        try {
            // Re-authenticate user
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            // Update password
            await updatePassword(auth.currentUser, newPassword);
            toast.success('Password updated successfully');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to update password');
            } else {
                toast.error('Failed to update password');
            }
            throw error;
        }
    };

    useEffect(() => {
        // Cek user dari localStorage lebih dulu
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
            const parsedUser = JSON.parse(userFromStorage);
            setUser(parsedUser);
            setCurrentRole(parsedUser.role);
            setIsAuthorized(true);
            setLoading(false);
            return;
        }
        // Cek role dari cookies jika tidak ada user
        const roleFromCookie = Cookies.get('role');
        if (roleFromCookie) {
            setCurrentRole(roleFromCookie as Role);
            setIsAuthorized(true);
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid));
                const userData = userDoc.data() as UserAccount;

                if (userData) {
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Logic otorisasi terpusat (bisa dipanggil dari layout)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Jika sudah dapat dari cookies, tidak perlu cek ulang
        const roleFromCookie = Cookies.get('role');
        if (roleFromCookie) {
            setCurrentRole(roleFromCookie as Role);
            setIsAuthorized(true);
            setLoading(false);
            return;
        }
        if (!user) {
            setIsAuthorized(false);
            setCurrentRole(null);
            setLoading(false);
            return;
        }
        // Get current path
        const currentPath = window.location.pathname;
        // Check role priority and validate access
        if (currentPath.startsWith('/dashboard')) {
            if (user.role !== Role.ADMINS) {
                setIsAuthorized(false);
                setCurrentRole(null);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.ADMINS);
            setIsAuthorized(true);
        } else if (currentPath.startsWith('/')) {
            if (user.role !== Role.USER && user.role !== Role.ADMINS) {
                setIsAuthorized(false);
                setCurrentRole(null);
                setLoading(false);
                return;
            }
            setCurrentRole(user.role);
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            setCurrentRole(null);
            setLoading(false);
            return;
        }
        setLoading(false);
    }, [user]);

    const value = {
        user,
        loading,
        login,
        logout,
        deleteAccount,
        hasRole,
        getDashboardUrl,
        signUp,
        forgotPassword,
        showInactiveModal,
        setShowInactiveModal,
        removeFromBookmarks,
        signInWithProvider,
        addToHistory,
        addToBookmarks,
        getBookmarkByAnimeId,
        toggleBookmark,
        changePassword,
        currentRole,
        setCurrentRole,
        isAuthorized,
        setIsAuthorized,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};