"use client"
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useEffect, useState } from 'react'

// Type for the loading type
const TYPE_COLORS: Record<string, string> = {
    anime: '#DC143C',
    donghua: '#1E90FF',
    manga: '#8B5CF6',
}

const LABEL_SEQUENCE = [
    'Loading Anime',
    'Loading Manga',
    'Loading Donghua',
    'Selamat Menonton',
]

function SpinningTorus({ color }: { color: string }) {
    const meshRef = React.useRef<THREE.Mesh>(null)
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.03
            meshRef.current.rotation.y += 0.04
        }
    })
    return (
        <mesh ref={meshRef} scale={1.2}>
            <torusGeometry args={[0.6, 0.2, 16, 100]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
        </mesh>
    )
}

// Star shape for anime
function SpinningStar({ color }: { color: string }) {
    const meshRef = React.useRef<THREE.Mesh>(null)
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.03
            meshRef.current.rotation.y += 0.04
        }
    })
    // Dodecahedron as a stylized star (for simplicity)
    return (
        <mesh ref={meshRef} scale={1.3}>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.25} />
        </mesh>
    )
}

interface LoadingProps {
    type?: 'anime' | 'donghua' | 'manga'
    progress?: number // 0-100
}

export default function Loading({ type = 'anime', progress }: LoadingProps) {
    const color = TYPE_COLORS[type] || TYPE_COLORS['anime']
    const [autoProgress, setAutoProgress] = useState(0)
    const isControlled = typeof progress === 'number'
    const clampedProgress = isControlled ? Math.min(Math.max(progress as number, 0), 100) : autoProgress
    const roundedProgress = Math.max(0, Math.min(100, Math.round(clampedProgress)))
    const [visible, setVisible] = useState(true);

    // Sync label with progress
    let labelIndex = 0;
    if (roundedProgress >= 100) labelIndex = 3;
    else if (roundedProgress >= 66) labelIndex = 2;
    else if (roundedProgress >= 33) labelIndex = 1;
    else labelIndex = 0;
    const label = LABEL_SEQUENCE[labelIndex];

    useEffect(() => {
        if (isControlled) {
            if (progress === 100) {
                const timeout = setTimeout(() => setVisible(false), 800);
                return () => clearTimeout(timeout);
            } else {
                setVisible(true);
            }
            return;
        }
        setAutoProgress(0);
        setVisible(true);
        let current = 0;
        const interval = setInterval(() => {
            current += 1;
            setAutoProgress(current);
            if (current >= 100) {
                clearInterval(interval);
                setTimeout(() => setVisible(false), 800);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [isControlled, progress]);

    // Lock scroll when overlay is visible
    useEffect(() => {
        if (visible) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = original; };
        } else {
            document.body.style.overflow = '';
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
                opacity: 0,
                scale: 0.95,
                transition: {
                    duration: 0.8,
                    ease: [0.4, 0.0, 0.2, 1]
                }
            }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(20, 20, 30, 0.65)',
                zIndex: 9999,
                backdropFilter: 'blur(12px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
                padding: '16px',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    transition: {
                        duration: 0.6,
                        ease: [0.4, 0.0, 0.2, 1]
                    }
                }}
                transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 'clamp(16px, 4vw, 20px)',
                    padding: 'clamp(20px, 6vw, 32px) clamp(16px, 4vw, 20px)',
                    minWidth: 'clamp(200px, 60vw, 280px)',
                    maxWidth: 'min(90vw, 320px)',
                    width: '100%',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.04)',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{
                        opacity: 0,
                        scale: 0.8,
                        rotate: 10,
                        transition: {
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1]
                        }
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                    style={{
                        width: 'clamp(70px, 20vw, 90px)',
                        height: 'clamp(70px, 20vw, 90px)',
                        borderRadius: '50%',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'clamp(4px, 1vw, 8px)',
                        border: `1.5px solid ${color}22`,
                    }}
                >
                    <Canvas camera={{ position: [0, 0, 2.5] }} style={{ borderRadius: '50%', width: '100%', height: '100%' }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[2, 2, 2]} intensity={0.7} />
                        {type === 'anime' ? <SpinningStar color={color} /> : <SpinningTorus color={color} />}
                    </Canvas>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        y: -15,
                        transition: {
                            duration: 0.4,
                            ease: [0.4, 0.0, 0.2, 1]
                        }
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                    style={{
                        color: color,
                        fontWeight: 800,
                        fontSize: 'clamp(18px, 5vw, 28px)',
                        letterSpacing: 'clamp(0.5px, 0.2vw, 1.5px)',
                        textShadow: `0 4px 24px ${color}55, 0 1px 8px #0008`,
                        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                        marginBottom: 'clamp(4px, 1vw, 8px)',
                        textAlign: 'center',
                        lineHeight: 1.2,
                        textTransform: 'uppercase',
                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
                        wordBreak: 'break-word',
                        hyphens: 'auto',
                    }}
                >
                    {label}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{
                        opacity: 0,
                        scaleX: 0.8,
                        transition: {
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1]
                        }
                    }}
                    transition={{
                        delay: 0.4,
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                    style={{
                        width: '100%',
                        maxWidth: 'clamp(140px, 40vw, 160px)',
                        marginTop: 'clamp(4px, 1vw, 8px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            background: 'linear-gradient(90deg, #fff2 0%, #fff1 100%)',
                            borderRadius: 'clamp(8px, 2vw, 10px)',
                            height: 'clamp(10px, 2.5vw, 12px)',
                            overflow: 'hidden',
                            boxShadow: `0 2px 12px 0 ${color}22`,
                            border: `1.5px solid ${color}33`,
                            position: 'relative',
                        }}
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${roundedProgress}%` }}
                            exit={{
                                width: '100%',
                                transition: {
                                    duration: 0.3,
                                    ease: [0.4, 0.0, 0.2, 1]
                                }
                            }}
                            transition={{ duration: 0.15, ease: 'linear' }}
                            style={{
                                height: '100%',
                                background: `linear-gradient(90deg, ${color} 0%, #fff 100%)`,
                                borderRadius: 'clamp(8px, 2vw, 10px)',
                                boxShadow: `0 0 8px 0 ${color}44`,
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                minWidth: 0,
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
            {/* Footer copyright */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1]
                    }
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{
                    position: 'absolute',
                    bottom: 'clamp(20px, 5vw, 30px)',
                    left: 0,
                    width: '100vw',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                    fontWeight: 400,
                    letterSpacing: 'clamp(0.3px, 0.1vw, 0.5px)',
                    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                    userSelect: 'none',
                    zIndex: 10001,
                    pointerEvents: 'none',
                    padding: '0 16px',
                }}
            >
                © Riznime {new Date().getFullYear()}
            </motion.div>
        </motion.div>
    )
}

// Optional: Add keyframes for glowPulse animation
const styleSheet = typeof window !== 'undefined' ? window.document.styleSheets[0] : null;
if (styleSheet && !Array.from(styleSheet.cssRules).find(r => r.cssText.includes('glowPulse'))) {
    styleSheet.insertRule(`@keyframes glowPulse {
        0% { box-shadow: 0 0 32px 0 #fff0, 0 0 0 6px #fff0; }
        100% { box-shadow: 0 0 48px 0 #fff6, 0 0 0 12px #fff2; }
    }`, styleSheet.cssRules.length);
}
