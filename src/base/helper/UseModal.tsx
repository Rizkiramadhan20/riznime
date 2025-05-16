import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out"
            onClick={onClose}
        >
            <div
                className={`bg-background border border-base-300 max-w-7xl w-full rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex gap-1.5 sm:gap-2.5 p-3 border-b border-base-300">
                    <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500/90 hover:bg-red-500 transition-colors cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500/90 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500/90 hover:bg-green-500 transition-colors cursor-pointer"></div>
                </div>
                <div className="relative p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 btn btn-circle btn-ghost btn-sm hover:bg-base-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
} 