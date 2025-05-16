import React from 'react'

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export default function Button({
    onClick,
    children,
    className = '',
    disabled = false
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                px-4 py-2 
                rounded-lg 
                bg-white/10 
                hover:bg-white/20 
                border border-white/20
                transition-all 
                duration-200 
                disabled:opacity-50 
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    )
}
