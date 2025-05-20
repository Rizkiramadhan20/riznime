'use client'

import React from 'react';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (selectedItem: { selected: number }) => {
        onPageChange(selectedItem.selected + 1);
    };

    return (
        <div className="flex justify-between items-center gap-4 w-full">
            <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
            </span>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                forcePage={currentPage - 1}
                onPageChange={handlePageChange}
                containerClassName="flex items-center gap-1 sm:gap-2"
                pageClassName="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--primary)]/10 text-[var(--primary)]/70 hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 relative"
                activeClassName="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 hover:text-white shadow-md shadow-[var(--primary)]/20 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-1 after:bg-white after:rounded-full"
                previousClassName="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--primary)]/10 text-[var(--primary)]/70 hover:text-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                nextClassName="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[var(--primary)]/10 text-[var(--primary)]/70 hover:text-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                disabledClassName="opacity-50 cursor-not-allowed"
                previousLabel={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                }
                nextLabel={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                }
                breakLabel={
                    <span className="px-1 sm:px-2 text-[var(--primary)]/50">•••</span>
                }
                aria-label="Pagination navigation"
            />
        </div>
    );
};

export default Pagination;