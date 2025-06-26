"use client"

import React, { useEffect, useState } from 'react'
import { LayoutDashboard, Users, Info, Eye, Trash2, Loader2 } from "lucide-react"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase/firebase'
import { Role, UserAccount } from '@/utils/context/types/Auth'
import { useAuth } from "@/utils/context/AuthContext"
import { auth } from "@/utils/firebase/firebase"
import { format, isValid } from "date-fns"

export default function UsersLayout() {
    const [users, setUsers] = useState<UserAccount[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<string | null>(null)
    const { user: currentUser } = useAuth()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
                    where("role", "==", Role.USER)
                )
                const querySnapshot = await getDocs(q)
                const userData = querySnapshot.docs.map(doc => {
                    const data = doc.data()
                    const createdAt = data.createdAt instanceof Date
                        ? data.createdAt
                        : data.createdAt?.toDate?.() || new Date()
                    return {
                        ...data,
                        uid: doc.id,
                        createdAt
                    }
                }) as UserAccount[]
                setUsers(userData)
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const formatDate = (date: Date | string | number) => {
        try {
            const dateObj = new Date(date)
            if (!isValid(dateObj)) {
                return '-'
            }
            return format(dateObj, 'dd MMM yyyy')
        } catch {
            return '-'
        }
    }

    const handleDelete = async (userId: string) => {
        if (!currentUser) {
            window.alert("You must be logged in to perform this action")
            return
        }
        try {
            setDeleting(userId)
            const idToken = await auth.currentUser?.getIdToken()
            if (!idToken) {
                throw new Error("Failed to get authentication token")
            }
            const response = await fetch(`/api/admins/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to delete user')
            }
            setUsers(prevUsers => prevUsers.filter(user => user.uid !== userId))
            window.alert("User deleted successfully")
        } catch (error) {
            console.error("Error deleting user:", error)
            window.alert(error instanceof Error ? error.message : "Failed to delete user")
        } finally {
            setDeleting(null)
        }
    }

    return (
        <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 p-4 rounded-2xl gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-4">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary sm:w-8 sm:h-8"
                        >
                            <path
                                d="M21 7L12 16L3 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 17L12 8L21 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    </div>
                    <nav className="flex items-center text-sm text-gray-500 gap-2">
                        <a href="/dashboard" className="flex items-center gap-1 capitalize hover:underline">
                            <LayoutDashboard className="h-4 w-4" /> dashboard
                        </a>
                        <span>/</span>
                        <a href="/dashboard/users" className="flex items-center gap-1 capitalize hover:underline">
                            <Users className="h-4 w-4" /> Users
                        </a>
                        <span>/</span>
                        <span className="flex items-center gap-1 capitalize">
                            <Info className="h-4 w-4" /> Users List
                        </span>
                    </nav>
                </div>
            </div>
            <div className="mt-6">
                <div className="rounded-xl shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <svg className="animate-spin h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            <span>Loading users...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full rounded-xl overflow-hidden shadow-md border border-[var(--border-color)] bg-[var(--card-bg)]">
                                <thead className="bg-[var(--primary)]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Joined Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border-color)]">
                                    {users.map((user, idx) => (
                                        <tr key={user.uid} className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-[var(--card-bg)]' : 'bg-[var(--card-bg)]/80'} hover:bg-[var(--hover-bg)]`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                                                <div className="flex items-center gap-3">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.displayName} className="h-10 w-10 rounded-full object-cover border-2 border-[var(--primary)]" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-lg border-2 border-[var(--primary)]">
                                                            {user.displayName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                        </div>
                                                    )}
                                                    <span className="font-semibold">{user.displayName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[var(--text-secondary)]">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[var(--text-secondary)]">{user.phoneNumber || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive ? 'bg-[var(--success)] text-white' : 'bg-[var(--error)] text-white'}`}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[var(--text-secondary)]">{formatDate(user.createdAt)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-2 rounded-full hover:bg-[var(--hover-bg)] text-[var(--primary)] transition-colors duration-150 cursor-not-allowed"
                                                        title="View Address"
                                                        disabled
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className={`p-2 rounded-full transition-colors duration-150 ${deleting === user.uid ? 'cursor-not-allowed opacity-60' : 'hover:bg-[var(--error)] hover:text-white text-[var(--error)]'}`}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                                                                handleDelete(user.uid)
                                                            }
                                                        }}
                                                        disabled={deleting === user.uid}
                                                    >
                                                        {deleting === user.uid ? (
                                                            <Loader2 className="h-5 w-5 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}