import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/base/helper/UseModal';

import imgSignin from "@/base/assets/signin/signin.webp"

import Image from 'next/image';

import SignupModal from '@/components/layout/Header/auth/signup/SignupModal';

import ForgotPasswordModal from '@/components/layout/Header/auth/forgot/ForgotModal';

import { loginSchema, LoginFormData } from '@/components/layout/Header/auth/schema/Validasi';

import { useAuth } from '@/utils/context/AuthContext';

import { TextInput, Checkbox, Button } from 'flowbite-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login, loginWithGoogle, loginWithGithub } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setValue('email', rememberedEmail);
            setValue('rememberMe', true);
        }
    }, [setValue]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsEmailLoading(true);
            if (data.rememberMe) {
                localStorage.setItem('rememberedEmail', data.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            await login(data.email, data.password);
            reset();
            onClose();
        } catch {
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            await loginWithGoogle();
            onClose();
        } catch {
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        try {
            setIsGithubLoading(true);
            await loginWithGithub();
            onClose();
        } catch {
        } finally {
            setIsGithubLoading(false);
        }
    };

    const handleSwitchToSignup = () => {
        setIsSignup(true);
        reset();
    };

    const handleSwitchToLogin = () => {
        setIsSignup(false);
        setIsForgotPassword(false);
        reset();
    };

    const handleSwitchToForgotPassword = () => {
        setIsForgotPassword(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isSignup ? (
                <SignupModal onSwitchToLogin={handleSwitchToLogin} />
            ) : isForgotPassword ? (
                <ForgotPasswordModal
                    onClose={handleSwitchToLogin}
                    initialEmail={watch('email')}
                />
            ) : (
                <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
                    {/* Left side - Image */}
                    <div className="hidden md:block w-1/2">
                        <div className="relative h-full rounded-l-xl overflow-hidden">
                            <Image
                                src={imgSignin}
                                alt="Signin"
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
                                <p className="text-white/90 text-lg">Sign in to continue your anime journey</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="w-full md:w-1/2 p-6">
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold mb-3 text-primary">Sign in to AnimeIndo</h1>
                            <p className="text-base-content/80">Enter your details to get started</p>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <Button
                                color="blue"
                                className='flex-1 transition-all duration-300'
                            >
                                Sign in
                            </Button>
                            <Button
                                onClick={handleSwitchToSignup}
                                color="gray"
                                className='flex-1 transition-all duration-300'
                            >
                                Sign up
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2.5'>
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
                                        <svg className="w-5 h-5 text-[var(--text-secondary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
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
                                <TextInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`${errors.password ? 'border-error' : ''}`}
                                    {...register('password')}
                                    icon={() => (
                                        <svg className="w-5 h-5 text-[var(--text-secondary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    )}
                                    rightIcon={() => (
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="text-[var(--text-secondary)] hover:text-primary transition-colors"
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
                                    )}
                                />
                                {errors.password && (
                                    <span className="text-error text-sm mt-1">{errors.password.message}</span>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-1">
                                <label className="label cursor-pointer gap-2 flex items-center">
                                    <Checkbox
                                        id="remember"
                                        {...register('rememberMe')}
                                        className='checkbox checkbox-primary text-primary'
                                    />
                                    <span className="label-text font-medium">Remember me</span>
                                </label>
                                <Button
                                    type="button"
                                    onClick={handleSwitchToForgotPassword}
                                    color="light"
                                    className="text-primary hover:text-primary-focus text-sm font-medium transition-colors"
                                >
                                    Forgot password?
                                </Button>
                            </div>
                            {errors.rememberMe && (
                                <span className="text-error text-sm mt-1">{errors.rememberMe.message}</span>
                            )}

                            <Button
                                type="submit"
                                color="blue"
                                className={`w-full transition-all duration-300 ${isEmailLoading ? 'opacity-70' : ''}`}
                                disabled={isEmailLoading || isGoogleLoading || isGithubLoading}
                            >
                                {isEmailLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Signing in...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                            <polyline points="10 17 15 12 10 7"></polyline>
                                            <line x1="15" y1="12" x2="3" y2="12"></line>
                                        </svg>
                                        <span>Sign in</span>
                                    </span>
                                )}
                            </Button>

                            <div className="divider">OR</div>

                            <div className="flex w-full gap-2">
                                <div className="card border rounded-box grid place-items-center w-full">
                                    <Button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        color="gray"
                                        className={`w-full transition-all duration-300 ${isGoogleLoading ? 'opacity-70' : ''}`}
                                        disabled={isEmailLoading || isGoogleLoading || isGithubLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Signing in...</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                                </svg>
                                                <span>Google</span>
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                <div className="card border rounded-box grid place-items-center w-full">
                                    <Button
                                        type="button"
                                        onClick={handleGithubLogin}
                                        color="gray"
                                        className={`w-full transition-all duration-300 ${isGithubLoading ? 'opacity-70' : ''}`}
                                        disabled={isEmailLoading || isGoogleLoading || isGithubLoading}
                                    >
                                        {isGithubLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Signing in...</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                <span>Github</span>
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Modal>
    );
} 