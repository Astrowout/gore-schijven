import Image from 'next/image';

import { TrackProps } from './Track.types';
import { getArtistsLine } from '../../utils/format';

export default function Track({
	album,
	name = '',
	artists = [],
	coverSize = 'w-12 h-12',
}: TrackProps) {
	const artistsLine = getArtistsLine(artists);

	return (
		<span className="flex items-center gap-x-3 max-w-[90%] text-sm text-left">
			{album && (
				<Image
					src={album.images[2].url}
					width={album.images[2].width}
					height={album.images[2].height}
					alt={album.name}
					className={`${coverSize} rounded`}
				/>
			)}
    
			<span className="flex flex-col flex-grow truncate">
				<p className="text-white truncate">
					{ name }
				</p>
        
				<p className="text-sm text-neutral-500 truncate">
					{ artistsLine }
				</p>
			</span>
		</span>
	);
};