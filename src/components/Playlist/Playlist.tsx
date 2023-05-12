import clsx from 'clsx';
import { PlaylistProps } from './Playlist.types';

export default function Playlist({
	className = '',
}: PlaylistProps) {
	return (
		<section className={clsx('mx-auto max-w-2xl', className)}>
			<iframe
				src="https://open.spotify.com/embed/playlist/7yjwgXgsidaFS5vLGevbfn?theme=0"
				width="100%"
				height="420"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
				className="rounded-xl shadow-xl"
			></iframe>
		</section>
	);
};