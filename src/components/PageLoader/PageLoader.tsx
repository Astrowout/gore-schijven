"use client";

import clsx from "clsx";
import Image from "next/image";

import { TITLE } from "@/config";
import imageSrc from "~/public/playlist.jpg";

import { TPageLoaderProps } from "./PageLoader.types";

export default function PageLoader ({
    text = "Loading",
}: TPageLoaderProps) {
    const renderDot = (delayClassName?: string) => (
        <span className={clsx("mx-[2px] inline-block h-[2px] w-[2px] animate-ping rounded-full bg-gray-400", delayClassName)} />
    );

    return (
        <div className="fixed inset-0 flex h-screen w-screen justify-center overflow-hidden bg-ui-dark">
            <Image
                alt=""
                className={clsx("absolute block h-auto w-auto max-w-3xl animate-loader rounded-3xl object-cover object-top shadow-2xl shadow-ui-dark/50")}
                height={8154}
                src={imageSrc}
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "top",
                }}
                width={1596}
            />

            <p className="fixed bottom-12 left-10 text-xl text-gray-500 sm:left-16">
                {text}

                {renderDot()}

                {renderDot("[animation-delay:80ms]")}

                {renderDot("[animation-delay:160ms]")}
            </p>

            <p className="fixed left-1/2 top-0 -translate-x-1/2 overflow-hidden rounded-b bg-brand px-2 py-1 pb-px text-center font-display text-lg tracking-wide text-white shadow-xl shadow-gray-900/30">
                {TITLE}
            </p>
        </div>
    );
};