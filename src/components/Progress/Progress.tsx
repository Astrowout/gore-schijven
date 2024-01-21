"use client";

import clsx from "clsx";
import {
    useEffect,
    useState,
} from "react";

import { ProgressProps } from "./Progress.types";

const TOTAL_SECONDS = 30;
const TOTAL_PROGRESS = 100;
let startTime = new Date();

export default function Progress ({
    size = 32,
    stroke = 2,
    isPlaying = false,
    className = "",
}: ProgressProps) {
    const [
        progress,
        setProgress,
    ] = useState(0);

    let interval: NodeJS.Timeout;

    const handleProgress = () => {
        resetProgress();

        startTime = new Date();
        interval = setInterval(updateProgress, 40);
    };

    const resetProgress = () => {
        if (interval) {
            clearInterval(interval);
            startTime = new Date();

            updateProgress();
        }
    };

    const updateProgress = () => {
        const timeDiff = (new Date().getTime() - startTime.getTime()) / 1000;
        const value = timeDiff / TOTAL_SECONDS * TOTAL_PROGRESS;

        setProgress(value);
    };

    useEffect(() => {
        if (isPlaying) {
            handleProgress();
        } else {
            resetProgress();
        }

        return () => {
            resetProgress();
        };
    }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    const normalizedRadius = (size / 2) - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return (
        <svg
            className={clsx("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90", className)}
            height={size}
            width={size}
        >
            <circle
                className="text-purple-500"
                cx={size / 2}
                cy={size / 2}
                fill="transparent"
                r={normalizedRadius}
                stroke="currentColor"
                strokeDasharray={circumference + " " + circumference}
                strokeWidth={stroke}
                style={{ strokeDashoffset }}
            />
        </svg>
    );
};