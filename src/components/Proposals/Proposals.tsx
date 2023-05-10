import { ProposalsProps } from './Proposals.types';

import { Proposal, EmptyState } from '@/components';
import { ITrack } from '@/types';
import { getDatabase } from '@/utils';
import { DATABASE_IDS } from '@/config';

export default async function Proposals({
	title = '',
}: ProposalsProps) {
	const res = await getDatabase(DATABASE_IDS.PROPOSALS);

	let tracks: ITrack[] = [];

	if (res) {
		tracks = res;
	}

	return (
		<section className="flex flex-col items-center gap-y-3 sm:gap-y-6 my-4 lg:my-0">
			<header className="text-center max-w-prose flex flex-col items-center">
				<h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
					{ title }
				</h1>
			</header>

			{!tracks.length && (
				<EmptyState message="Er zijn nog geen vadsige drops toegevoegd." />
			)}

			{!!tracks.length && (
				<ul className='flex flex-col w-full max-w-2xl gap-y-8 lg:gap-y-10'>
					{tracks.map((track) => (
						<li key={track.id}>
							<Proposal
								notionPageId={track.id}
								likes={track.likes}
								url={track.spotifyUrl}
								status={track.status}
								createdTime={track.createdTime}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};