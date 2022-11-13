import { useEffect, useState } from 'react';

import { ProgressProps } from "./Progress.types";

const TOTAL_SECONDS = 30;
const TOTAL_PROGRESS = 100;
let startTime = new Date();

export default function Progress({
    size = 32,
    stroke = 2,
    isPlaying = false,
    className = "",
}: ProgressProps) {
    const [progress, setProgress] = useState(0);

    let interval: any = null;

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
        }
    }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const normalizedRadius = (size / 2) - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return (
        <svg
            height={size}
            width={size}
            className={`${className} -rotate-90`}
        >
            <circle
                stroke="currentColor"
                fill="transparent"
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
                className="text-purple-500"
            />
        </svg>
    );
};