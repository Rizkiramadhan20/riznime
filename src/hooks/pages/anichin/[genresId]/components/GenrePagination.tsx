'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Pagination from '@/base/helper/Pagination';

interface Props {
    genreId: string;
    currentPage: number;
    totalPages: number;
}

export default function GenrePagination({ genreId, currentPage, totalPages }: Props) {
    const router = useRouter();

    const handlePageChange = (page: number) => {
        router.push(`/donghua/genre/${genreId}?page=${page}`, { scroll: true });
    };

    return (
        <div className="mt-8 z-[60] relative">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
} 