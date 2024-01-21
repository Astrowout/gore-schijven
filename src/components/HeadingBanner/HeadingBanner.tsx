"use client";

import {
    AnimatePresence,
    motion,
} from "framer-motion";
import Link from "next/link";

import { MotionStore } from "@/store";

import {
    transition,
    variants,
} from "./HeadingBanner.motion";
import { THeadingBannerProps } from "./HeadingBanner.types";

export default function HeadingBanner ({
    title = "",
}: THeadingBannerProps) {
    const { isInView } = MotionStore();

    return (
        <AnimatePresence>
            {!isInView && (
                <motion.header
                    animate="animate"
                    className="fixed left-1/2 top-0 z-40"
                    exit="initial"
                    initial="initial"
                    transition={transition}
                    variants={variants}
                >
                    <Link
                        className="block -translate-x-1/2 overflow-hidden rounded-b bg-brand text-center font-display text-lg tracking-wide shadow-xl shadow-gray-900/30 transition-colors hover:bg-purple-700"
                        href="/"
                    >
                        <h1 className="px-2 py-1 pb-px text-white">
                            {title}
                        </h1>
                    </Link>
                </motion.header>
            )}
        </AnimatePresence>
    );
};