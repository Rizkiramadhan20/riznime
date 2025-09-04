import React from 'react';

interface RizverseBannerProps {
    className?: string;
}

export default function RizverseBanner({ className = '' }: RizverseBannerProps) {
    return (
        <div className={`relative w-full h-[500px] overflow-hidden rounded-md ${className}`}>
            {/* Modern Background with Gradient and Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0">
                {/* Floating Icons */}
                <div className="absolute top-16 left-16 animate-bounce">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute top-24 right-24 animate-bounce delay-1000">
                    <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-32 left-1/3 animate-bounce delay-2000">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8.001 8.001 0 00-8 8c0 1.892.402 3.13 1.5 4.317L4.083 9a6.004 6.004 0 016-6h1.946c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0010 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                {/* Badge */}
                <div className="mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Streaming Tanpa Iklan
                    </div>
                </div>

                {/* Main Title */}
                <div className="mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
                        Nikmati Streaming
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Tanpa Iklan
                    </h2>
                </div>

                {/* Description */}
                <div className="mb-10 max-w-2xl">
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        Akses ribuan anime, donghua, manga, dan film terbaru dengan pengalaman streaming yang bersih dan bebas gangguan iklan
                    </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Download App Button */}
                    <a
                        href="https://rizverse.my.id/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download Aplikasi
                    </a>

                    {/* Learn More Button */}
                    <a href="https://rizverse.my.id" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Pelajari Lebih Lanjut
                    </a>
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Tanpa Iklan</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Kualitas HD</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Update Rutin</span>
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Website URL */}
            <div className="absolute bottom-6 right-6">
                <a
                    href="https://rizverse.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                    rizverse.my.id
                </a>
            </div>
        </div>
    );
}
