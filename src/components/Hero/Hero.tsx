import Heading from "../Heading/Heading";
import { HeroProps } from "./Hero.types";

export default function Hero({
    children,
    title = "",
    description = "",
}: HeroProps) {
    return (
        <section className="flex flex-col items-center py-10 sm:py-12 sm:pt-16 px-5">
            <Heading title={title} />

            <div className="text-center max-w-prose flex flex-col mt-8">
                <p className="text-neutral-500">
                    { description }
                </p>

                <div className="mt-8">
                    { children }
                </div>
            </div>

            <div className="w-full max-w-xl mt-12">
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