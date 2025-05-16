import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Image from 'next/image';

import imgSignin from "@/base/assets/signup/signup.webp"

import { signupSchema, SignupFormData } from '@/components/layout/Header/auth/schema/Validasi';

import { useAuth } from '@/utils/context/AuthContext';

interface SignupModalProps {
    onSwitchToLogin: () => void;
}

export default function SignupModal({ onSwitchToLogin }: SignupModalProps) {
    const { signUp, loginWithGoogle, loginWithGithub } = useAuth();
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            agreeTerms: false
        }
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            setIsEmailLoading(true);
            await signUp(data.email, data.password, data.username);
            reset();
            onSwitchToLogin();
        } catch {
            // Error handling is done in the auth context
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setIsGoogleLoading(true);
            await loginWithGoogle();
        } catch {
            // Error handling is done in the auth context
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleGithubSignup = async () => {
        try {
            setIsGithubLoading(true);
            await loginWithGithub();
        } catch {
            // Error handling is done in the auth context
        } finally {
            setIsGithubLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
            {/* Left side - Image */}
            <div className="hidden md:block w-1/2">
                <div className="relative h-full rounded-l-xl overflow-hidden">
                    <Image
                        src={imgSignin}
                        alt="Signup"
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className="text-4xl font-bold mb-3">Join Our Community!</h2>
                        <p className="text-white/90 text-lg mb-4">Create your account and start your anime journey with us</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>Access to exclusive content</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>Save your favorite anime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>Join the anime community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-3 text-primary">Create Account</h1>
                    <p className="text-base-content/80">Fill in your details to get started</p>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={onSwitchToLogin}
                        className='btn btn-ghost flex-1 hover:bg-base-200 transition-all duration-300 shadow-md hover:shadow-lg'
                    >
                        Sign in
                    </button>
                    <button className='btn btn-primary flex-1 hover:bg-primary-focus transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'>
                        Sign up
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className="form-control gap-1">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-base">Username</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.username ? 'border-error' : ''}`}
                                placeholder="Enter your username"
                                {...register('username')}
                            />
                        </div>
                        {errors.username && (
                            <span className="text-error text-sm mt-1">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="form-control gap-1">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-base">Email</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.email ? 'border-error' : ''}`}
                                placeholder="Enter your email"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <span className="text-error text-sm mt-1">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="form-control gap-1">
                        <label className="label py-2">
                            <span className="label-text font-semibold text-base">Password</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.password ? 'border-error' : ''}`}
                                placeholder="Enter your password"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-primary transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-error text-sm mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="form-control gap-1">
                        <label className="label py-2">
                            <span className="label-text font-semibold text-base">Confirm Password</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.confirmPassword ? 'border-error' : ''}`}
                                placeholder="Confirm your password"
                                {...register('confirmPassword')}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-primary transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <label className="label cursor-pointer gap-3">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary checkbox-sm opacity-0 absolute"
                                    {...register('agreeTerms')}
                                />
                                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
                                    ${watch('agreeTerms') ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                    {watch('agreeTerms') && (
                                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="label-text font-medium">I agree to the terms and conditions</span>
                        </label>
                    </div>
                    {errors.agreeTerms && (
                        <span className="text-error text-sm mt-1">{errors.agreeTerms.message}</span>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary w-full hover:bg-primary-focus transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-2 ${isEmailLoading ? 'loading' : ''}`}
                        disabled={!watch('agreeTerms') || isEmailLoading || isGoogleLoading || isGithubLoading}
                    >
                        {isEmailLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Creating account...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                                <span>Create Account</span>
                            </span>
                        )}
                    </button>

                    <div className="divider">OR</div>

                    <div className="flex w-full gap-2">
                        <div className="card border rounded-box grid place-items-center w-full">
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className={`btn btn-ghost hover:bg-base-200 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg ${isGoogleLoading ? 'loading' : ''}`}
                                disabled={isEmailLoading || isGoogleLoading || isGithubLoading}
                            >
                                {isGoogleLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Creating account...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                        </svg>
                                        <span>Google</span>
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="card border rounded-box grid place-items-center w-full">
                            <button
                                type="button"
                                onClick={handleGithubSignup}
                                className={`btn btn-ghost hover:bg-base-200 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg ${isGithubLoading ? 'loading' : ''}`}
                                disabled={isEmailLoading || isGoogleLoading || isGithubLoading}
                            >
                                {isGithubLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Creating account...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span>Github</span>
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 