import React from 'react'

export default function CategorySkeleton() {
    return (
        <section className="min-h-full">
            {/* Header Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-8 flex justify-between items-center">
                <div className="space-y-1">
                    <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                    </div>
                </div>
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                </div>
            </div>

            {/* Category Table Skeleton */}
            <div className="bg-[var(--card-bg)] rounded-3xl shadow-sm border border-[var(--border-color)]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border-color)]">
                                <th className="text-left py-4 px-6">
                                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                    </div>
                                </th>
                                <th className="text-right py-4 px-6">
                                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden ml-auto">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b border-gray-50">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                                </div>
                                                <div className="h-3 w-20 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                            </div>
                                            <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}