import clsx from "clsx";

import { TPlayingDecorationProps } from "./PlayingDecoration.types";

export default function PlayingDecoration ({
    className = "",
    isPlaying = false,
}: TPlayingDecorationProps) {
    return (
        <div
            className={clsx("absolute left-1/2 top-1/2 h-auto w-[104%] -translate-x-1/2 -translate-y-1/2 bg-ui-dark transition-opacity duration-500 ease-linear", className, {
                "opacity-0 delay-500": !isPlaying,
                "opacity-100": isPlaying,
            })}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none h-full w-full object-cover opacity-30"
                src="/bg-decoration.mp4"
            />
        </div>
    );
};