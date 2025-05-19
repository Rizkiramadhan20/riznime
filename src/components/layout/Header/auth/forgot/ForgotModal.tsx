import React, { useState } from 'react';
import { useAuth } from '@/utils/context/AuthContext';
import Image from 'next/image';
import imgSignin from "@/base/assets/forgot/forgot.webp"
import { TextInput } from 'flowbite-react';

interface ForgotPasswordModalProps {
    onClose: () => void;
    initialEmail?: string;
}

export default function ForgotPasswordModal({ onClose, initialEmail = '' }: ForgotPasswordModalProps) {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState(initialEmail);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await forgotPassword(email);
            onClose();
        } catch {
            // Error handling is done in the auth context
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
            {/* Left side - Image */}
            <div className="hidden md:block w-1/2">
                <div className="relative h-full rounded-l-xl overflow-hidden">
                    <Image
                        src={imgSignin}
                        alt="Forgot Password"
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-bold mb-3">Reset Password</h2>
                        <p className="text-white/90 text-lg">Enter your email to reset your password</p>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 p-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-3 text-primary">Reset Your Password</h1>
                    <p className="text-base-content/80">Enter your email address and we&apos;ll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="form-control gap-1">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-base">Email</span>
                        </label>
                        <TextInput
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            icon={() => (
                                <span className="flex items-center h-full pt-3 pl-2">
                                    <svg className="w-5 h-5 text-[var(--text-secondary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </span>
                            )}
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost flex-1 hover:bg-base-200 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Back to Login
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary flex-1 hover:bg-primary-focus transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl bg-primary py-3 rounded-md ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading || !email}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2 text-white">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 text-white">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 2L11 13"></path>
                                        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                                    </svg>
                                    <span>Send Reset Link</span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 