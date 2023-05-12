import Image from 'next/image';

import { TrackProps } from './Track.types';

import { getArtistsLine } from '@/utils';

export default function Track({
	album,
	name = '',
	artists = [],
	coverSize = 'w-12 h-12',
}: TrackProps) {
	const artistsLine = getArtistsLine(artists);

	return (
		<span className="flex max-w-[90%] items-center gap-x-3 text-left text-sm">
			{album && (
				<Image
					src={album.images[2].url}
					width={album.images[2].width}
					height={album.images[2].height}
					alt={album.name}
					className={`${coverSize} rounded`}
				/>
			)}

			<span className="flex grow flex-col truncate">
				<p className="truncate text-white">
					{ name }
				</p>

				<p className="truncate text-sm text-neutral-500">
					{ artistsLine }
				</p>
			</span>
		</span>
	);
};