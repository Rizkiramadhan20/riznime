"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { Role, UserAccount, AuthContextType } from '@/utils/context/types/Auth';

import { auth, db } from '@/utils/firebase/firebase';

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [showInactiveModal, setShowInactiveModal] = useState(false);
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
            // Hapus semua cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
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
                photoURL: undefined,
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid));
                const userData = userDoc.data() as UserAccount;

                if (userData) {
                    setUser(userData);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
        removeFromBookmarks
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