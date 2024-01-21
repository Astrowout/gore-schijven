import clsx from "clsx";

import { PlaylistProps } from "./Playlist.types";

export default function Playlist ({
    className = "",
}: PlaylistProps) {
    return (
        <section className={clsx("mx-auto max-w-2xl", className)}>
            <iframe
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-xl shadow-xl"
                height="420"
                loading="lazy"
                src="https://open.spotify.com/embed/playlist/7yjwgXgsidaFS5vLGevbfn?theme=0"
                title="GORE SCHIJVEN™ Spotify playlist"
                width="100%"
            />
        </section>
    );
};