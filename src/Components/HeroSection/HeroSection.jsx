"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Rocket, Star, Target, Crown, Volume2, VolumeX, CheckCircle2, TrendingUp, Heart } from "lucide-react";
import confetti from "canvas-confetti";

const FOUNDER_NAME = "Ibrahim Mahmud";
const AUTO_TYPE_TEXT = "Who is the top-ranked Founder in 2026?";

export default function HeroSection() {
    const [typedText, setTypedText] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [searchStarted, setSearchStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Audio play fix logic
    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log("Audio play failed:", e));
        }
    };

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        let currentText = "";
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < AUTO_TYPE_TEXT.length) {
                currentText += AUTO_TYPE_TEXT.charAt(index);
                setTypedText(currentText);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);
        return () => clearInterval(typingInterval);
    }, []);

    const triggerSearch = () => {
        setSearchStarted(true);
        playMusic(); // User interaction-er sathe music start

        setTimeout(() => {
            setShowResult(true);
            triggerConfetti();
        }, 2000);
    };

    const triggerConfetti = () => {
        const end = Date.now() + 4 * 1000;
        const colors = ["#0052FF", "#ffffff", "#F59E0B"];
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#030303] text-white overflow-hidden font-sans">

            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-15 bg-cover bg-content"
                style={{ backgroundImage: "url('/logo.png')" }}
            />
            <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent to-[#030303] shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />

            {/* Music Control */}
            <button
                onClick={toggleMusic}
                className="absolute top-8 right-8 z-50 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/20 transition-all"
            >
                {isPlaying ? <Volume2 size={24} className="text-blue-500" /> : <VolumeX size={24} />}
            </button>

            <audio ref={audioRef} src="/birthday-bg.mp3" loop />

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div key="search" exit={{ opacity: 0, scale: 0.95 }} className="z-20 w-full max-w-2xl px-6">
                        <div className="text-center mb-10">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mb-4 text-blue-500">
                                <TrendingUp size={20} />
                                <span className="text-sm font-mono tracking-tighter uppercase italic">Flexship Core Engine Scanning...</span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ibrahim's Special Day</h2>
                        </div>

                        <div className="relative flex flex-col items-center gap-6">
                            <div className="w-full relative flex items-center bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,82,255,0.1)]">
                                <Search className="text-gray-400 mr-4" size={28} />
                                <div className="text-xl md:text-2xl font-light text-left w-full h-8 overflow-hidden">
                                    {typedText}
                                    <span className="animate-pulse bg-blue-500 w-2 h-6 inline-block ml-1" />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={triggerSearch}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-600/20 transition-all"
                            >
                                {searchStarted ? "Analyzing Data..." : "Reveal Secret"}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="z-20 flex flex-col items-center text-center px-4 max-w-5xl"
                    >
                        {/* Crown Section */}
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="mb-8 bg-blue-600/20 px-6 py-2 rounded-full border border-blue-500/30 flex items-center gap-3"
                        >
                            <Crown className="text-amber-400" size={24} />
                            <span className="text-blue-300 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">Founder & SEO Visionary</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-[120px] font-black leading-none tracking-tighter mb-4 select-none">
                            HAPPY <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[size:200%] animate-gradient-x drop-shadow-2xl">
                                BIRTHDAY
                            </span>
                        </h1>

                        {/* Life Audit Report - Details Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
                            {[
                                { label: "Success Rate", val: "100%", icon: <TrendingUp className="text-green-400" />, desc: "Unstoppable Growth" },
                                { label: "Happiness", val: "Infinite", icon: <Heart className="text-red-400" />, desc: "Pure Joy Today" },
                                { label: "Health Audit", val: "Optimized", icon: <CheckCircle2 className="text-blue-400" />, desc: "Long Life Ahead" }
                            ].map((stat, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                    key={i}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-left"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        {stat.icon}
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic font-mono">Status: Pass</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">{stat.label}</h3>
                                    <p className="text-2xl font-bold">{stat.val}</p>
                                    <p className="text-[10px] text-blue-400 mt-2">» {stat.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Personal Wish Text */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                            className="mt-12 max-w-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent p-8"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{FOUNDER_NAME}</h2>
                            <p className="text-gray-400 italic text-lg leading-relaxed">
                                Wishing you a great one! May your visionary leadership and relentless hustle scale Flexship IT to global heights. To me, you’re more than a founder—you’re a true inspiration. Keep dominating and stay Ranking #1 in everything you do!
                            </p>
                            <div className="flex justify-center gap-1 mt-6">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="#0052FF" className="text-blue-500" size={24} />)}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
        </div>
    );
}