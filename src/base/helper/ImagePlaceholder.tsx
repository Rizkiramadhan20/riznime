import React from 'react';

interface ImagePlaceholderProps {
    className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ className }) => {
    return (
        <div className={`flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 ${className}`}>
            <svg
                className="w-12 h-12 text-purple-400 dark:text-purple-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Kawaii face - now with slight concern expression */}
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                {/* Eyes - slightly curved for concern */}
                <path d="M8.5 11.5C8.5 11.5 8.5 10.5 9 10.5C9.5 10.5 9.5 11.5 9.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14.5 11.5C14.5 11.5 14.5 10.5 15 10.5C15.5 10.5 15.5 11.5 15.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Slightly concerned mouth */}
                <path
                    d="M9 15.5c.85-.37 1.885-.5 3-.5s2.15.13 3 .5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                {/* Anime sparkles */}
                <path
                    d="M19 5l1-1m-1 1l-1-1m1 1l-1 1m1-1l1 1M5 19l1-1m-1 1l-1-1m1 1l-1 1m1-1l1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
            <p className="mt-2 text-sm font-medium text-purple-400 dark:text-purple-300">Broken Image</p>
        </div>
    );
};

export default ImagePlaceholder;

