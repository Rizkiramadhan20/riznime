import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Image from 'next/image';

import imgSignin from "@/base/assets/signup/signup.webp"

import { signupSchema, SignupFormData } from '@/components/layout/Header/auth/schema/Validasi';

import { useAuth } from '@/utils/context/AuthContext';

import { TextInput, Checkbox, Button } from 'flowbite-react';

interface SignupModalProps {
    onSwitchToLogin: () => void;
}

export default function SignupModal({ onSwitchToLogin }: SignupModalProps) {
    const { signUp, signInWithProvider } = useAuth();
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
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

    const handleProviderLogin = async (provider: 'google' | 'github') => {
        if (provider === 'google') {
            setIsGoogleLoading(true);
        } else {
            setIsGithubLoading(true);
        }

        try {
            await signInWithProvider(provider);
            onSwitchToLogin();
        } catch {
            // Error is already handled in AuthContext
        } finally {
            if (provider === 'google') {
                setIsGoogleLoading(false);
            } else {
                setIsGithubLoading(false);
            }
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
                    <Button
                        onClick={onSwitchToLogin}
                        color="gray"
                        className='flex-1 transition-all duration-300'
                    >
                        Sign in
                    </Button>
                    <Button
                        color="blue"
                        className='flex-1 transition-all duration-300'
                    >
                        Sign up
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className="form-control gap-1">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-base">Username</span>
                        </label>
                        <TextInput
                            type="text"
                            placeholder="Enter your username"
                            className={`${errors.username ? 'border-error' : ''}`}
                            {...register('username')}
                            icon={() => (
                                <span className="flex items-center h-full">
                                    <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                            )}
                        />
                        {errors.username && (
                            <span className="text-error text-sm mt-1">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="form-control gap-1">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-base">Email</span>
                        </label>
                        <TextInput
                            type="email"
                            placeholder="Enter your email"
                            className={`${errors.email ? 'border-error' : ''}`}
                            {...register('email')}
                            icon={() => (
                                <span className="flex items-center h-full">
                                    <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </span>
                            )}
                        />
                        {errors.email && (
                            <span className="text-error text-sm mt-1">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="form-control gap-1">
                        <label className="label py-2">
                            <span className="label-text font-semibold text-base">Password</span>
                        </label>
                        <div className="relative">
                            <TextInput
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`${errors.password ? 'border-error' : ''}`}
                                {...register('password')}
                                icon={() => (
                                    <span className="flex items-center h-full">
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </span>
                                )}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-primary transition-colors"
                            >
                                <span className="flex items-center h-full">
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
                                </span>
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
                        <div className="relative">
                            <TextInput
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className={`${errors.confirmPassword ? 'border-error' : ''}`}
                                {...register('confirmPassword')}
                                icon={() => (
                                    <span className="flex items-center h-full">
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </span>
                                )}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-primary transition-colors"
                            >
                                <span className="flex items-center h-full">
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
                                </span>
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <Checkbox
                            id="agreeTerms"
                            {...register('agreeTerms')}
                            className='checkbox checkbox-primary text-primary'
                        />
                        <label htmlFor="agreeTerms" className="label cursor-pointer">
                            <span className="label-text font-medium">I agree to the Terms of Service and Privacy Policy</span>
                        </label>
                    </div>
                    {errors.agreeTerms && (
                        <span className="text-error text-sm mt-1">{errors.agreeTerms.message}</span>
                    )}

                    <Button
                        type="submit"
                        color="blue"
                        className={`w-full transition-all duration-300 ${isEmailLoading ? 'opacity-70' : ''}`}
                        disabled={isEmailLoading}
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
                    </Button>
                </form>

                <div className="divider my-4 text-sm">Or continue with</div>

                <div className="flex flex-col gap-3">
                    <Button
                        color="light"
                        className="w-full"
                        onClick={() => handleProviderLogin('google')}
                        disabled={isGoogleLoading || isGithubLoading}
                    >
                        {isGoogleLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing up...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path d="M12 5.38c1.63 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Sign up with Google
                            </span>
                        )}
                    </Button>
                    <Button
                        color="light"
                        className="w-full"
                        onClick={() => handleProviderLogin('github')}
                        disabled={isGoogleLoading || isGithubLoading}
                    >
                        {isGithubLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing up...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Sign up with GitHub
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
} 