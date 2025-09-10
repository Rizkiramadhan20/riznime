"use client";

import React, { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function HorizontalAd() {
    const adRef = useRef<HTMLModElement | null>(null);

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch {
            // Ignore ad blocker errors
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4016803466870090"
            data-ad-slot="8501659474"
            data-ad-format="auto"
            data-full-width-responsive="true"
            ref={adRef}
        />
    );
}


