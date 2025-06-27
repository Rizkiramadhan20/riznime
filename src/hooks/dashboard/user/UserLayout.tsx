"use client"

import React, { useEffect, useState } from 'react'

import { motion } from "framer-motion"

import { Trash2, Loader2 } from "lucide-react"

import { collection, getDocs, query, where } from 'firebase/firestore'

import { db, auth } from '@/utils/firebase/firebase'

import { Role, UserAccount } from '@/utils/context/types/Auth'

import { format, isValid } from "date-fns"

import toast from 'react-hot-toast'

import Image from 'next/image'

import { useAuth } from "@/utils/context/AuthContext"

function UsersSkeleton() {
    return (
        <div className="w-full">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function UsersLayout() {
    const [users, setUsers] = useState<UserAccount[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)
    const { user: currentUser } = useAuth()
    const [showDeleteModal, setShowDeleteModal] = useState<UserAccount | null>(null);

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
                    // Convert Firestore Timestamp to Date if needed
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
                toast.error("Error fetching users")
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

    const handleStatusChange = async (userId: string, newStatus: boolean) => {
        if (!currentUser) {
            toast.error("You must be logged in to perform this action")
            return
        }

        try {
            setUpdating(userId)

            // Get the current user's ID token
            const idToken = await auth.currentUser?.getIdToken()
            if (!idToken) {
                throw new Error("Failed to get authentication token")
            }

            const response = await fetch(`/api/admins/users/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    isActive: newStatus
                })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to update user status')
            }

            // Update local state
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.uid === userId
                        ? { ...user, isActive: newStatus }
                        : user
                )
            )

            toast.success(`User status updated successfully`)
        } catch (error) {
            console.error("Error updating user status:", error)
            toast.error(error instanceof Error ? error.message : "Failed to update user status")
        } finally {
            setUpdating(null)
        }
    }

    const handleDelete = async (userId: string) => {
        if (!currentUser) {
            toast.error("You must be logged in to perform this action")
            return
        }

        try {
            setDeleting(userId)

            // Get the current user's ID token
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

            // Update local state
            setUsers(prevUsers => prevUsers.filter(user => user.uid !== userId))
            toast.success("User deleted successfully")
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error(error instanceof Error ? error.message : "Failed to delete user")
        } finally {
            setDeleting(null)
            setShowDeleteModal(null)
        }
    }

    return (
        <section>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8"
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
                        className="text-xl sm:text-2xl md:text-3xl font-bold"
                    >
                        Management Accounts
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="text-sm sm:text-base"
                    >
                        Dafar Accounts
                    </motion.p>
                </motion.div>
            </motion.div>

            <div className="mt-6">
                <div className="bg-card-bg border border-card-border rounded-lg shadow-sm">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-text">User Accounts</h3>
                    </div>
                    <div className="border-t border-card-border">
                        {loading ? (
                            <div className="p-6">
                                <UsersSkeleton />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-hover">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">User</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Email</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Phone</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Joined Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-card-bg divide-y divide-border">
                                        {users.map((user) => (
                                            <tr key={user.uid}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-hover flex items-center justify-center overflow-hidden">
                                                            <Image width={1080} height={1080} className="h-8 w-8 object-cover" src={user.photoURL as string} alt={user.displayName} />
                                                        </div>
                                                        <span>{user.displayName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={user.isActive ? "true" : "false"}
                                                        onChange={(e) => handleStatusChange(user.uid, e.target.value === "true")}
                                                        disabled={updating === user.uid}
                                                        className="w-[110px] bg-background text-text border-border rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                    >
                                                        <option value="true">Active</option>
                                                        <option value="false">Inactive</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {formatDate(user.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setShowDeleteModal(user)}
                                                            disabled={deleting === user.uid}
                                                            className="p-2 hover:bg-hover rounded-full disabled:opacity-50"
                                                        >
                                                            {deleting === user.uid ? (
                                                                <Loader2 className="h-4 w-4 animate-spin text-error" />
                                                            ) : (
                                                                <Trash2 className="h-4 w-4 text-error" />
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
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-card-bg rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold text-text">Are you sure?</h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            This action cannot be undone. This will permanently delete the user account
                            and remove their data from our servers.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                disabled={deleting === showDeleteModal.uid}
                                className="px-4 py-2 text-sm font-medium text-text bg-card-bg border border-border rounded-md shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => showDeleteModal && handleDelete(showDeleteModal.uid)}
                                disabled={deleting === showDeleteModal.uid}
                                className="px-4 py-2 text-sm font-medium text-white bg-error border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                {deleting === showDeleteModal.uid ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Deleting...
                                    </div>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}