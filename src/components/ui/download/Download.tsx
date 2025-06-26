"use client"

import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-expect-error No types available for this library.
import * as random from 'maath/random/dist/maath-random.esm'
import Image from 'next/image'
import image from "@/base/assets/gambar.png"
import * as THREE from 'three'

function Stars(props: ThreeElements['points']) {
    const ref = useRef<THREE.Points>(null)
    const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }))
    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Points ref={ref as any} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial transparent color="#DC143C" size={0.005} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

export default function Download() {
    return (
        <section className="relative w-full py-16 bg-background flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <Stars />
                    </Suspense>
                </Canvas>
            </div>
            <div className="relative z-10 w-full max-w-7xl px-2 sm:px-6 lg:px-8 mx-auto">
                <div className='backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/30 dark:border-gray-700 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 p-4 md:p-10'>
                    {/* Phone Mockup */}
                    <div className="relative mx-auto border-gray-200 dark:border-gray-700 bg-gray-800 border-[8px] rounded-[2rem] h-[420px] w-[200px] sm:h-[520px] sm:w-[260px] shadow-xl flex items-center justify-center">
                        <div className="rounded-[1.5rem] overflow-hidden w-full h-full bg-background flex items-center justify-center">
                            <div className="animate-marquee-y w-full h-full flex flex-col">
                                <Image
                                    src={image}
                                    alt="Riznime App"
                                    className="w-full h-auto object-cover"
                                    placeholder="blur"
                                    priority
                                />
                                <Image
                                    src={image}
                                    alt="Riznime App"
                                    aria-hidden="true"
                                    className="w-full h-auto object-cover"
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Modern */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl w-full gap-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 text-text leading-tight">
                            Download <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Riznime</span>
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-text-secondary mb-4 font-medium">
                            Jelajahi ribuan <span className="font-semibold text-primary dark:text-accent">anime</span>, <span className="font-semibold text-primary dark:text-accent">donghua</span>, dan <span className="font-semibold text-primary dark:text-accent">manga</span> favoritmu dalam satu aplikasi! Streaming, baca, dan nikmati update terbaru dengan tampilan modern dan fitur lengkap. Unduh sekarang dan temukan dunia hiburan tanpa batas!
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto justify-center md:justify-start">
                            {/* Android Button */}
                            <a
                                href={"/Riznime.apk"}
                                download
                                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[150px]"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><g><path d="M17.6 9.48l1.43-2.48a.5.5 0 1 0-.87-.5l-1.46 2.54A7.02 7.02 0 0 0 6.3 9.04L4.84 6.5a.5.5 0 1 0-.87.5l1.43 2.48A6.98 6.98 0 0 0 3 14.5c0 .28.22.5.5.5h.5v2.5A2.5 2.5 0 0 0 7 20h1a.5.5 0 0 0 .5-.5V15h7v4.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5V15h.5a.5.5 0 0 0 .5-.5c0-2.13-.84-4.07-2.4-5.02zM7.5 18.5A1.5 1.5 0 0 1 6 17v-2h1.5v3.5zm9 0A1.5 1.5 0 0 1 16 17v-2h1.5v3.5zM12 13a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4z" fill="currentColor" /></g></svg>
                                <span className="text-lg font-bold">Android</span>
                            </a>
                            {/* App Store Button */}
                            <a
                                href="#"
                                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-card border border-card-border hover:bg-hover text-text font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 min-w-[150px]"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17.564 13.07c.01 2.29 2.01 3.05 2.02 3.06-.02.07-.32 1.09-1.05 2.16-.63.97-1.29 1.93-2.33 1.95-1.02.02-1.35-.63-2.52-.63-1.17 0-1.54.61-2.51.65-1.01.04-1.78-1.05-2.41-2.01-1.31-1.98-2.31-5.6-.97-8.05.67-1.25 1.87-2.04 3.18-2.06 1-.02 1.94.68 2.52.68.58 0 1.66-.84 2.8-.72.48.02 1.83.2 2.7 1.52-.07.04-1.61.94-1.6 2.8Zm-3.01-5.47c.47-.57.79-1.36.7-2.15-.68.03-1.5.45-1.99 1.02-.44.51-.82 1.32-.68 2.1.8.06 1.5-.41 1.97-.97Z" fill="currentColor" /></svg>
                                <span className="text-lg font-bold">Apple</span>
                            </a>
                            {/* Windows Button */}
                            <a
                                href="#"
                                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 min-w-[150px]"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M2 4.5L11.5 3.2v8.3H2V4.5zm0 15V13.5h9.5v7.3L2 19.5zm10.5-16.5l9.5-1.3v10.3h-9.5V3zm9.5 12.2V21l-9.5-1.3v-6.5h9.5z" fill="currentColor" /></svg>
                                <span className="text-lg font-bold">Windows</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
