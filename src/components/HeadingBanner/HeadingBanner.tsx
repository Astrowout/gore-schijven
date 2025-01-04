"use client";

import clsx from "clsx";
import { useInView } from "framer-motion";
import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import { THeadingBannerProps } from "./HeadingBanner.types";

export default function HeadingBanner ({
    title = "",
}: THeadingBannerProps) {
    const triggerRef = useRef(null);
    const [
        isVisible,
        setIsVisible,
    ] = useState(false);
    const isInView = useInView(triggerRef);

    useEffect(() => {
        setIsVisible(!isInView);
    }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div
                className={clsx("fixed left-1/2 top-0 z-40 -translate-y-full duration-500 ease-expoOut", {
                    "!translate-y-0": isVisible,
                })}
            >
                <Link
                    className="block -translate-x-1/2 overflow-hidden rounded-b bg-brand text-center font-display text-lg tracking-wide shadow-xl shadow-gray-900/30 transition-colors hover:bg-purple-700"
                    href="/"
                >
                    <h1 className="px-2 py-1 pb-px text-white">
                        {title}
                    </h1>
                </Link>
            </div>

            <span
                ref={triggerRef}
                className="absolute top-32 size-px sm:top-48"
            />
        </>
    );
};