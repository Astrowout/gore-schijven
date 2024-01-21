"use client";

import clsx from "clsx";
import Link from "next/link";

import { MotionStore } from "@/store";

import { THeadingBannerProps } from "./HeadingBanner.types";

export default function HeadingBanner ({
    title = "",
}: THeadingBannerProps) {
    const { isInView } = MotionStore();

    return (
        <div
            className={clsx("fixed left-1/2 top-0 z-40 duration-500 ease-out-expo", {
                "translate-y-0": !isInView,
                "-translate-y-full": isInView,
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
    );
};