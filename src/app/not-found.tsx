'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Link from 'next/link'
import { Github, Youtube, Instagram, Facebook, Home, Search, BookOpen } from 'lucide-react'
import { FaTiktok } from "react-icons/fa"

// Three.js Anime-themed Component (Floating stars/particles)
function AnimeParticle({ position, rotation, speed, color }: {
    position: [number, number, number],
    rotation: [number, number, number],
    speed: number,
    color: string
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += speed * 0.01
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002
            meshRef.current.position.x += Math.cos(state.clock.elapsedTime * 1.5) * 0.001
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.3 : 1}
        >
            <octahedronGeometry args={[0.03, 0]} />
            <meshStandardMaterial
                color={hovered ? "#ffffff" : color}
                emissive={hovered ? "#ffffff" : color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.8}
            />
        </mesh>
    )
}

// Three.js Scene Component
function Scene() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005
        }
    })

    return (
        <group ref={groupRef}>
            {/* Floating anime particles */}
            <AnimeParticle position={[-2, 1, 0]} rotation={[0, 0, 0]} speed={1} color="#ff6b6b" />
            <AnimeParticle position={[2, -1, 0]} rotation={[0, 0, 0]} speed={1.5} color="#4ecdc4" />
            <AnimeParticle position={[-1.5, -0.5, 0]} rotation={[0, 0, 0]} speed={0.8} color="#45b7d1" />
            <AnimeParticle position={[1.5, 0.8, 0]} rotation={[0, 0, 0]} speed={1.2} color="#96ceb4" />
            <AnimeParticle position={[0, 1.5, 0]} rotation={[0, 0, 0]} speed={0.6} color="#feca57" />
            <AnimeParticle position={[-0.8, 2, 0]} rotation={[0, 0, 0]} speed={1.1} color="#ff9ff3" />
            <AnimeParticle position={[0.8, -2, 0]} rotation={[0, 0, 0]} speed={0.9} color="#54a0ff" />

            {/* Ambient light */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
        </group>
    )
}

export default function NotFound() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Canvas */}
            <div className="absolute inset-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <Scene />
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Main 404 Section */}
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center">
                        {/* Large 404 Numbers */}
                        <div className="flex items-center justify-center space-x-8 mb-8">
                            <motion.div
                                className="text-9xl font-black text-text drop-shadow-2xl"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                4
                            </motion.div>

                            {/* Center Colon with Anime Emoji */}
                            <div className="flex flex-col items-center space-y-2">
                                <motion.div
                                    className="w-8 h-2 bg-primary rounded-full shadow-lg"
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                />
                                <motion.div
                                    className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-4xl relative shadow-2xl"
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    🎌
                                    <motion.div
                                        className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        👆
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="w-8 h-2 bg-primary rounded-full shadow-lg"
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                />
                            </div>

                            <motion.div
                                className="text-9xl font-black text-text drop-shadow-2xl"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                4
                            </motion.div>
                        </div>

                        {/* Error Message */}
                        <motion.div
                            className="max-w-3xl mx-auto mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                Episode/Chapter Tidak Ditemukan! 😅
                            </h1>
                            <p className="text-text-secondary text-lg leading-relaxed">
                                Sepertinya episode atau chapter yang kamu cari sudah dihapus atau belum rilis.
                                Jangan khawatir, bahkan ninja terbaik pun kadang tersesat di hutan anime! 🌸
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <Link href="/">
                                <motion.button
                                    className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Home size={20} />
                                    <span>BERANDA</span>
                                </motion.button>
                            </Link>

                            <Link href="/anime">
                                <motion.button
                                    className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Search size={20} />
                                    <span>ANIME</span>
                                </motion.button>
                            </Link>

                            <Link href="/manga">
                                <motion.button
                                    className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <BookOpen size={20} />
                                    <span>MANGA</span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.footer
                    className="p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    {/* Copyright */}
                    <div className="text-text-secondary text-sm text-center sm:text-left">
                        © 2024 RizNime - Pusatnya Anime, Donghua & Manga. All rights reserved.
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <motion.a
                            href="https://github.com/Rizkiramadhan20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-primary hover:bg-primary-hover rounded-lg flex items-center justify-center text-white transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Github size={20} />
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com/rzkir.20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-secondary hover:bg-secondary-hover rounded-lg flex items-center justify-center text-white transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Instagram size={20} />
                        </motion.a>
                        <motion.a
                            href="https://www.youtube.com/@codingwithrizki"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-lg flex items-center justify-center text-white transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Youtube size={20} />
                        </motion.a>
                        <motion.a
                            href="https://www.facebook.com/rizki.ramadhan.419859"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Facebook size={20} />
                        </motion.a>
                        <motion.a
                            href="https://www.tiktok.com/@rzkir.20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-error rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTiktok size={20} />
                        </motion.a>
                    </div>
                </motion.footer>
            </div>

            {/* Floating Anime Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-60"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)]
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
