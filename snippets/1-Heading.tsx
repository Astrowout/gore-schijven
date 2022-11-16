"use client";

import { HeroProps } from "./Heading.types";
import { AnimatePresence, motion } from "framer-motion";

import { headerAnim, layoutTransition, textAnim } from "./Heading.animation";
import { useEffect, useState } from "react";

export default function Heading({
    title = "",
}: HeroProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    
        return () => {
            setMounted(false);
        }
    }, []);

    return (
        <div className="flex items-center justify-center">
            <AnimatePresence>
                <motion.header
                    variants={headerAnim}
                    initial="initial"
                    animate="animate"
                    layout
                    layoutDependency={mounted}
                    style={{
                        position: mounted ? "static" : "fixed",
                        width: mounted ? "auto" : "100%",
                        height: mounted ? "auto" : "100%",
                        borderRadius: mounted ? "6px" : "0px",
                    }}
                    transition={layoutTransition}
                    className="text-3xl origin-center sm:text-5xl md:text-6xl inset-0 overflow-hidden text-center flex items-center justify-center text-white font-display tracking-wide bg-purple-800 shadow-xl"
                >
                    <motion.h1
                        variants={textAnim}
                        className="block whitespace-nowrap pt-2 sm:pt-3 px-4 pb-1"
                    >
                        { title }
                    </motion.h1>
                </motion.header>
            </AnimatePresence>
        </div>
    );
};