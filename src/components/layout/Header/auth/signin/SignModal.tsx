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
    const { login } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
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
                                        <span className="flex items-center h-full">
                                            <svg className="w-5 h-5 text-[var(--text-secondary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                <TextInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`${errors.password ? 'border-error' : ''}`}
                                    {...register('password')}
                                    icon={() => (
                                        <span className="flex items-center h-full">
                                            <svg className="w-5 h-5 text-[var(--text-secondary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </span>
                                    )}
                                    rightIcon={() => (
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="flex items-center h-full pr-2 text-[var(--text-secondary)] hover:text-primary transition-colors"
                                        >
                                            {showPassword ? (
                                                <span className="flex items-center h-full">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span className="flex items-center h-full">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                                    </svg>
                                                </span>
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
                                disabled={isEmailLoading}
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
                        </form>
                    </div>
                </div>
            )}
        </Modal>
    );
} 