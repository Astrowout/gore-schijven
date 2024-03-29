import clsx from "clsx";
import Link from "next/link";

import { HeadingProps } from "./Heading.types";

export default function Heading ({
    title = "",
}: HeadingProps) {
    const renderTitle = () => (
        <span
            aria-hidden="true"
            className='block px-3 text-white sm:px-5'
        >
            {title}
        </span>
    );

    const renderMarquee = (animationClass: string) => (
        <span className={clsx("absolute top-2 z-10 flex whitespace-nowrap sm:top-3.5", animationClass)}>
            {renderTitle()}

            {renderTitle()}

            {renderTitle()}
        </span>
    );

    return (
        <header className="l-section--sm self-center !pb-0">
            <Link
                className="relative flex -rotate-1 items-center justify-center overflow-hidden rounded bg-purple-800 px-4 pt-2 text-center font-display text-3xl tracking-wide shadow-xl transition-colors hover:bg-purple-700 sm:pt-3.5 sm:text-5xl md:text-6xl"
                href="/"
            >
                <h1 className="opacity-0">
                    {title}
                </h1>

                {renderMarquee("animate-marquee")}

                {renderMarquee("animate-marquee2")}
            </Link>
        </header>
    );
};