import clsx from "clsx";
import Image from "next/image";

import imageSrc from "~/public/playlist.jpg";

import { TPageLoaderProps } from "./PageLoader.types";

export default function PageLoader ({
    text = "Loading",
}: TPageLoaderProps) {
    const renderDot = (delayClassName?: string) => (
        <span className={clsx("mx-[3px] inline-block h-[3px] w-[3px] animate-ping rounded-full bg-gray-300", delayClassName)} />
    );

    const renderImage = () => (
        <Image
            alt=""
            className={clsx("block h-auto w-full object-cover")}
            height={4760}
            src={imageSrc}
            width={960}
        />
    );

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen justify-center overflow-hidden bg-ui-dark">
            <div
                className="absolute flex w-full max-w-3xl animate-loader flex-col overflow-hidden rounded-3xl opacity-80 shadow-2xl shadow-black"
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "top",
                }}
            >
                {renderImage()}

                {renderImage()}
            </div>

            <p className="fixed bottom-12 left-12 text-xl text-gray-300 sm:left-16">
                {text}

                {renderDot()}

                {renderDot("[animation-delay:80ms]")}

                {renderDot("[animation-delay:160ms]")}
            </p>
        </div>
    );
};