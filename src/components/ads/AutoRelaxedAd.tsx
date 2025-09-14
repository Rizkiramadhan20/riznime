"use client";

import React, { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function AutoRelaxedAd() {
    useEffect(() => {
        const loadAd = () => {
            try {
                if (typeof window !== "undefined" && window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (error) {
                console.log("AdSense error:", error);
            }
        };

        // Load ad immediately if script is already loaded
        loadAd();

        // Also try after a short delay in case script is still loading
        const timeout = setTimeout(loadAd, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4016803466870090"
            data-ad-slot="1413560844"
            data-ad-format="autorelaxed"
        />
    );
}


