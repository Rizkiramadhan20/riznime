"use client";

import React, { Fragment } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import Navigation from "@/components/layout/Navigation/Navigation";

import { Toaster } from "react-hot-toast";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAdminRoute =
        pathname?.includes("/profile")
        || pathname?.includes("/dashboard")
        || false;

    return (
        <Fragment>
            {!isAdminRoute && <Header />}
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
            {!isAdminRoute && <Navigation />}
            {!isAdminRoute && <Footer />}
        </Fragment>
    );
};

export default Pathname;