"use client";

import clsx from "clsx";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import debounce from "lodash/debounce";
import { useState } from "react";

import { saveReactions } from "@/services/actions";

import {
    transition,
    variants,
} from "./Feedback.motion";
import { TFeedbackProps } from "./Feedback.types";

const debouncedSaveReactions = debounce(saveReactions, 1500);

export default function Feedback ({
    id = "",
    likes = 0,
    dislikes = 0,
    disabled = false,
}: TFeedbackProps) {
    const [
        optimisticLikes,
        setOptimisticLikes,
    ] = useState(likes);
    const [
        optimisticDislikes,
        setOptimisticDislikes,
    ] = useState(dislikes);

    const likeTrack = () => {
        const newLikesCount = optimisticLikes + 1;
        setOptimisticLikes(newLikesCount);
        debouncedSaveReactions(id, newLikesCount, optimisticDislikes);
    };

    const dislikeTrack = () => {
        const newDislikesCount = optimisticDislikes + 1;
        setOptimisticDislikes(newDislikesCount);
        debouncedSaveReactions(id, optimisticLikes, newDislikesCount);
    };

    const renderCount = (count: number) => (
        <AnimatePresence
            initial={false}
            mode="wait"
        >
            <motion.span
                key={count}
                layout
                animate="animate"
                className="ml-2.5 block text-base tabular-nums text-gray-400"
                exit="exit"
                initial="initial"
                transition={transition}
                variants={variants}
            >
                {count}
            </motion.span>
        </AnimatePresence>
    );

    const buttonClasses = "group flex items-center overflow-hidden px-4 h-10 duration-300 shadow-lg transition hover:shadow-xl hover:shadow-purple-500/20";
    const svgClasses = "h-6 w-6 shrink-0 text-gray-400 transition duration-300 group-hover:scale-125 group-hover:text-white group-active:scale-100";

    return (
        <div
            className={clsx("flex items-center rounded-lg", {
                "pointer-events-none": disabled,
                "border border-gray-600 bg-ui-dark": !disabled,
            })}
        >
            <button
                className={clsx(buttonClasses, "pl-3")}
                disabled={disabled}
                type="button"
                onClick={likeTrack}
            >
                <svg
                    className={svgClasses}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <span className='sr-only'>
                    Like song
                </span>

                {renderCount(optimisticLikes)}
            </button>

            <button
                className={clsx(buttonClasses, "border-l border-l-gray-800 pr-3")}
                disabled={disabled}
                type="button"
                onClick={dislikeTrack}
            >
                <svg
                    className={svgClasses}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <span className='sr-only'>
                    Dislike song
                </span>

                {renderCount(optimisticDislikes)}
            </button>
        </div>
    );
};