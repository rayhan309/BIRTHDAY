"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Rocket, Star, Target, Crown, Volume2,
    VolumeX, CheckCircle2, TrendingUp, Heart, Sparkles, ShieldCheck, Zap
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
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Music blocked"));
            }
            setIsPlaying(!isPlaying);
        }
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
        }, 40);
        return () => clearInterval(typingInterval);
    }, []);

    const triggerSearch = () => {
        setSearchStarted(true);
        // Play music automatically on search trigger if possible
        if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }

        setTimeout(() => {
            setShowResult(true);
            triggerConfetti();
        }, 2800);
    };

    const triggerConfetti = () => {
        const end = Date.now() + 6 * 1000;
        const colors = ['#3b82f6', '#06b6d4', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden selection:bg-blue-500/30 font-sans">

            {/* Premium Background Grid */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(#1e40af 0.5px, transparent 0.5px), radial-gradient(#1e40af 0.5px, #020202 0.5px)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0 0, 20px 20px'
                    }}
                />
                {/* Floating Glow Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Music Control */}
            <button
                onClick={toggleMusic}
                className="fixed top-8 right-8 z-50 p-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full hover:scale-110 transition-all active:scale-95 group shadow-xl"
            >
                {isPlaying ? <Volume2 size={18} className="text-blue-400 group-hover:animate-pulse" /> : <VolumeX size={18} className="text-gray-400" />}
            </button>

            <audio ref={audioRef} src="/my_song.mp3" loop />

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key="search-ui"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, filter: "blur(20px)" }}
                        className="z-20 w-full max-w-xl px-6"
                    >
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ y: -10 }} animate={{ y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            >
                                <ShieldCheck size={12} /> Encrypted Protocol
                            </motion.div>
                            <h2 className="text-6xl font-black tracking-tighter mb-3">
                                FLEX<span className="text-blue-500">SHIP</span>
                            </h2>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">Founder Search Engine v2.6</p>
                        </div>

                        <div className="space-y-6 relative">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl min-h-[80px]">
                                    <Search className="text-blue-500/70 mr-4 shrink-0" size={24} />
                                    <div className="text-[17px] font-medium text-gray-100 leading-tight">
                                        {typedText}<span className="w-1.5 h-6 bg-blue-500 inline-block ml-1 animate-[pulse_0.8s_infinite]" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={triggerSearch}
                                disabled={searchStarted}
                                className="w-full relative group overflow-hidden bg-blue-600 py-6 rounded-2xl font-black text-sm transition-all cursor-pointer hover:bg-blue-500 active:scale-[0.97] disabled:opacity-80"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.2em]">
                                    {searchStarted ? "SCANNING UNIVERSE..." : "EXECUTE ANALYSIS"}
                                    {!searchStarted && <Rocket size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                {searchStarted && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: 2.8, ease: "easeInOut" }}
                                    />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="z-20 flex flex-col items-center text-center px-4 max-w-6xl py-12"
                    >
                        {/* Result Badge */}
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="mb-8 flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 px-6 py-2 rounded-full backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        >
                            <Zap size={14} className="text-blue-400 fill-blue-400" />
                            <span className="text-[11px] font-black tracking-[0.3em] uppercase text-blue-400">Identity Found: {FOUNDER_NAME}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="text-7xl md:text-[160px] font-[1000] leading-[0.85] tracking-[-0.07em] mb-12"
                        >
                            HAPPY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-600/50 drop-shadow-2xl">
                                BIRTHDAY
                            </span>
                        </motion.h1>

                        {/* Stats Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-6">
                            {[
                                { label: "Impact", val: "BEYOND LIMITS", icon: <TrendingUp size={28} />, color: "text-emerald-400", glow: "group-hover:shadow-emerald-500/20" },
                                { label: "Status", val: "G.O.A.T BROTHER", icon: <Heart size={28} />, color: "text-red-400", glow: "group-hover:shadow-red-500/20" },
                                { label: "2026 Vision", val: "UNSTOPPABLE", icon: <Sparkles size={28} />, color: "text-amber-400", glow: "group-hover:shadow-amber-500/20" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 + 0.5 }}
                                    className={`p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 group hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/20 ${stat.glow}`}
                                >
                                    <div className={`${stat.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500`}>{stat.icon}</div>
                                    <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-2">{stat.label}</p>
                                    <p className="text-2xl font-black tracking-tighter">{stat.val}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Personal Message Card */}
                        {/* Personal Message Card - Enhanced with Success Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="mt-16 relative p-[1px] rounded-[3.5rem] overflow-hidden"
                        >
                            {/* Animated Border Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-[spin_4s_linear_infinite] opacity-30" />

                            <div className="relative bg-[#050505] p-12 md:p-20 rounded-[3.4rem] max-w-4xl">
                                <Crown className="text-amber-500 mx-auto mb-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={56} />

                                <h3 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tight">
                                    Dear Ibrahim Brother,
                                </h3>

                                <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-medium italic opacity-90">
                                    "System scan complete. Result: <span className="text-white font-black not-italic border-b-2 border-blue-500 pb-1">You are the 1 of 1 Architect of Innovation.</span>
                                    <br /><br />
                                    Finding a visionary mentor and an elder brother like you is truly a matter of luck.
                                    The way you are scaling <span className="text-blue-400 font-bold uppercase tracking-wider">Flexship IT</span> into a global powerhouse is a masterclass in leadership.
                                    Remember, this isn't just a peak—it's the base camp for the mountains you are about to conquer."
                                </p>

                                {/* Future Milestones Display */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-y border-white/5">
                                    {[
                                        { label: "Market Reach", val: "GLOBAL" },
                                        { label: "Innovation", val: "ELITE" },
                                        { label: "Legacy", val: "ICONIC" },
                                        { label: "Growth", val: "∞ UNLIMITED" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="text-center">
                                            <p className="text-[9px] text-blue-500 font-bold tracking-widest uppercase mb-1">{item.label}</p>
                                            <p className="text-sm font-black text-white">{item.val}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-14">
                                    <div className="flex justify-center gap-2 mb-6">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#3b82f6" className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />)}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4">May your 2026 be defined by <span className="text-white font-bold">Exponential Success</span> and <span className="text-white font-bold">Deep Fulfillment.</span></p>
                                    <span className="text-blue-500/80 font-mono text-[10px] font-bold tracking-[0.5em] uppercase block">
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