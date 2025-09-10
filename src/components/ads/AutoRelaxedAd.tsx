"use client";

import React, { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function AutoRelaxedAd() {
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
            data-ad-slot="1413560844"
            data-ad-format="autorelaxed"
        />
    );
}


