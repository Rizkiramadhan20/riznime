import React, { useEffect } from 'react'

import RizverseBanner from '@/components/ui/banner/RizverseBanner'

interface ModalPopupProps {
    onClose: () => void;
}

export default function ModalPopup({ onClose }: ModalPopupProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-[9999]">
            <div className="relative w-full max-w-4xl mx-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Banner Content */}
                <div className="relative">
                    <RizverseBanner />

                    {/* Additional Content Overlay */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                        <p className="text-white text-sm font-medium">
                            Platform Anime, Donghua, Manga & Film Terdepan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}