"use client";

import React, { Fragment, useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import Navigation from "@/components/layout/Navigation/Navigation";

import { Toaster } from "react-hot-toast";

import Loading from "@/base/helper/Loading";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [showLoading, setShowLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        // Jika ini adalah load pertama (refresh atau buka tab baru)
        if (isFirstLoad) {
            setShowLoading(true);
            setProgress(0);
            // Smooth progress animation dengan lebih banyak tahap
            setProgress(5);
            const step1 = setTimeout(() => setProgress(20), 300);
            const step2 = setTimeout(() => setProgress(40), 600);
            const step3 = setTimeout(() => setProgress(60), 900);
            const step4 = setTimeout(() => setProgress(80), 1200);
            const step5 = setTimeout(() => setProgress(95), 1500);
            const end = setTimeout(() => {
                setProgress(100);
                setTimeout(() => {
                    setShowLoading(false);
                    setIsFirstLoad(false);
                }, 600);
            }, 1800);
            return () => {
                clearTimeout(step1);
                clearTimeout(step2);
                clearTimeout(step3);
                clearTimeout(step4);
                clearTimeout(step5);
                clearTimeout(end);
            };
        } else {
            // Jika sudah pernah load, langsung tampilkan konten tanpa loading
            setShowLoading(false);
        }
    }, [isFirstLoad]); // Dependency hanya isFirstLoad, bukan pathname

    const isAdminRoute =
        pathname?.includes("/profile")
        || pathname?.includes("/dashboard")
        || false;

    if (showLoading) {
        return <Loading progress={progress} />;
    }

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