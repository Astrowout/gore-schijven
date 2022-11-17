"use client";

import { HeroProps } from "./Heading.types";

export default function Heading({
    title = "",
}: HeroProps) {
    return (
        <header className="text-3xl sm:text-5xl md:text-6xl rounded text-center flex items-center justify-center -rotate-1 font-display tracking-wide bg-purple-800 shadow-xl">
            <h1 className="text-white pt-2 sm:pt-3 px-4 pb-1">
                { title }
            </h1>
        </header>
    );
};