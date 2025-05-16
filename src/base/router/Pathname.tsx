"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import Navigation from "@/components/layout/Navigation/Navigation";

import { Toaster } from "react-hot-toast";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAdminRoute = pathname?.includes("/signin")
        || pathname?.includes("/signup")
        || pathname?.includes("/dashboard")
        || false;

    return (
        <div className='relative min-h-screen bg-[var(--background)]'>
            {!isAdminRoute && <Header />}
            <main>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        className: 'shadow-lg',
                        style: {
                            background: 'var(--header-bg)',
                            color: 'var(--text)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid var(--header-border)',
                        },
                        success: {
                            style: {
                                background: 'var(--success)',
                                color: '#fff',
                                border: 'none',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: 'var(--success)',
                            },
                        },
                        error: {
                            style: {
                                background: 'var(--error)',
                                color: '#fff',
                                border: 'none',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: 'var(--error)',
                            },
                        },
                    }}
                />
                {children}
            </main>
            {!isAdminRoute && <Navigation />}
            {!isAdminRoute && <Footer />}
        </div>
    );
};

export default Pathname;