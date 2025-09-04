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
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-16 right-8 sm:top-24 sm:right-16 md:top-40 md:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-8 left-1/4 sm:bottom-12 md:bottom-20 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0">
                {/* Floating Icons */}
                <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-16 md:left-16 animate-bounce">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute top-12 right-8 sm:top-16 sm:right-12 md:top-24 md:right-24 animate-bounce delay-1000">
                    <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-16 left-1/3 sm:bottom-20 md:bottom-32 animate-bounce delay-2000">
                    <div className="w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8.001 8.001 0 00-8 8c0 1.892.402 3.13 1.5 4.317L4.083 9a6.004 6.004 0 016-6h1.946c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0010 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8 -mt-10 md:-mt-0">
                {/* Badge */}
                <div className="mb-3 sm:mb-4">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm">Streaming Tanpa Iklan</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-2 sm:mb-4">
                        Nikmati Streaming
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Tanpa Iklan
                    </h2>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8 md:mb-10 max-w-lg sm:max-w-xl md:max-w-2xl">
                    <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                        Akses ribuan anime, donghua, manga, dan film terbaru dengan pengalaman streaming yang bersih dan bebas gangguan iklan
                    </p>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {/* Download App Button */}
                    <a
                        href="https://rizverse.my.id/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm md:text-base">Download Aplikasi</span>
                    </a>

                    {/* Learn More Button */}
                    <a href="https://rizverse.my.id" className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/20 hover:border-white/40">
                        <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm md:text-base">Pelajari Lebih Lanjut</span>
                    </a>
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-white/80">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm">Tanpa Iklan</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm">Kualitas HD</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm">Update Rutin</span>
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Website URL */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6">
                <a
                    href="https://rizverse.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-300 text-xs sm:text-sm font-medium"
                >
                    rizverse.my.id
                </a>
            </div>
        </div>
    );
}
