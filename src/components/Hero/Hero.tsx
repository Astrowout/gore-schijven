import { HeroProps } from "./Hero.types";

export default function Hero({
    title = "",
    description = "",
    children = null,
}: HeroProps) {
    return (
        <section className="flex flex-col items-center py-10 sm:py-12 sm:pt-16 px-5 gap-y-8 sm:gap-y-12">
            <header className="text-center max-w-prose flex flex-col items-center gap-y-8">
                <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-display tracking-wide -rotate-1 bg-purple-800 pt-2 sm:pt-3 px-4 rounded shadow-xl pb-1">
                    { title }
                </h1>

                <p className="text-neutral-500">
                    { description }
                </p>

                { children }
            </header>

            <div className="w-full max-w-xl">
                <iframe
                    src="https://open.spotify.com/embed/playlist/7yjwgXgsidaFS5vLGevbfn?theme=0"
                    width="100%"
                    height="380"
                    allowFullScreen={undefined}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl shadow-xl"
                ></iframe>
            </div>
        </section>
    );
};