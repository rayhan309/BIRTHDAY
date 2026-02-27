"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Rocket, Star, Target, Crown, Volume2,
    VolumeX, CheckCircle2, TrendingUp, Heart, Sparkles, ShieldCheck
} from "lucide-react";
import confetti from "canvas-confetti";

// Configuration
const FOUNDER_NAME = "Ibrahim Mahmud";
const AUTO_TYPE_TEXT = "Initiating global scan for the most inspiring Founder...";

export default function BirthdayHero() {
    const [typedText, setTypedText] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [searchStarted, setSearchStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Audio Logic
    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Music play blocked"));
        }
        setIsPlaying(!isPlaying);
    };

    // Typing Effect
    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= AUTO_TYPE_TEXT.length) {
                setTypedText(AUTO_TYPE_TEXT.slice(0, index));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    const triggerSearch = () => {
        setSearchStarted(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }

        // Logic for delay and result
        setTimeout(() => {
            setShowResult(true);
            triggerConfetti();
        }, 2500);
    };

    const triggerConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30 font-sans">

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{ backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />

            {/* Music Control */}
            <button onClick={toggleMusic} className="fixed top-6 right-6 z-50 p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl hover:scale-110 transition-all shadow-2xl">
                {isPlaying ? <Volume2 size={20} className="text-blue-400 animate-pulse" /> : <VolumeX size={20} className="text-gray-400" />}
            </button>

            <audio ref={audioRef} src="/my_song.mp3" loop />

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div key="search-ui" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} className="z-20 w-full max-w-xl px-6">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-6">
                                <ShieldCheck size={12} /> Verification Required
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter mb-2 italic underline-offset-8 decoration-blue-500">FLEXSHIP<span className="text-blue-500">.OS</span></h2>
                            <p className="text-gray-500 text-xs font-light uppercase tracking-[0.3em]">Birthday Intelligence Protocol</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative flex items-center bg-[#0A0A0A] border border-white/10 rounded-[1.8rem] p-5 shadow-2xl">
                                    <Search className="text-blue-500 ml-2 mr-4" size={24} />
                                    <div className="text-lg md:text-xl font-medium text-gray-200">
                                        {typedText}<span className="w-[2px] h-6 bg-blue-500 inline-block ml-1 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            <button onClick={triggerSearch} className="w-full relative group overflow-hidden bg-blue-600 py-5 rounded-[1.8rem] font-bold text-lg transition-all hover:bg-blue-500 active:scale-[0.98]">
                                <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest">
                                    {searchStarted ? "SYSTEM SCANNING..." : "EXECUTE SEARCH"}
                                    {!searchStarted && <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </span>
                                {searchStarted && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-full bg-blue-400/20"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.5 }}
                                    />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-20 flex flex-col items-center text-center px-4 max-w-5xl py-20">
                        {/* Status Badge */}
                        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-6 flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">Target Identified: {FOUNDER_NAME}</span>
                        </motion.div>

                        <h1 className="text-7xl md:text-[140px] font-[1000] leading-none tracking-[-0.05em] mb-8">
                            HAPPY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-blue-600 drop-shadow-[0_10px_10px_rgba(59,130,246,0.5)]">
                                BIRTHDAY
                            </span>
                        </h1>

                        {/* Stats Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
                            {[
                                { label: "Hustle Quotient", val: "BEYOND LIMITS", icon: <TrendingUp size={24} />, color: "text-emerald-400", desc: "Pushing Flexship to top" },
                                { label: "Brotherhood Level", val: "G.O.A.T", icon: <Heart size={24} />, color: "text-red-400", desc: "Best Brother Forever" },
                                { label: "Success Outlook", val: "UNSTOPPABLE", icon: <Sparkles size={24} />, color: "text-amber-400", desc: "Dominating 2026" }
                            ].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
                                    className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all group">
                                    <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-125 transition-transform duration-500`}>{stat.icon}</div>
                                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black mb-1 tracking-tight">{stat.val}</p>
                                    <p className="text-[10px] text-blue-500/70 font-mono italic">{"// " + stat.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Personal Message Card */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                            className="mt-12 p-[1px] bg-gradient-to-r from-blue-500/30 via-transparent to-blue-500/30 rounded-[3rem]">
                            <div className="bg-[#080808] p-10 md:p-16 rounded-[2.9rem] border border-white/5 max-w-4xl shadow-2xl">
                                <Crown className="text-amber-500 mx-auto mb-8 animate-bounce" size={48} />
                                <h3 className="text-4xl font-bold mb-6 italic tracking-tight">Dear Ibrahim Bhai,</h3>
                                <p className="text-gray-400 text-xl leading-relaxed font-light italic">
                                    "System scan complete. Result: <span className="text-white font-bold not-italic underline decoration-blue-500">You are the 1 of 1.</span>
                                    Apnar moto ekjon visionary mentor ar boro vai pawa asholei luck-er bisoy.
                                    Flexship IT-ke apni jekhane niye jachchen, seta toh sudhu shuru!
                                    May your personal 'OS' always stay updated with happiness, health, and massive success."
                                </p>
                                <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center">
                                    <div className="flex gap-2 mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#3b82f6" className="text-blue-500" />)}
                                    </div>
                                    <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">
                                        -- Deployed with love by your brother --
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}