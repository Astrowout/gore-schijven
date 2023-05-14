import {
	Proposal, EmptyState,
} from '@/components';
import { ITrack } from '@/types';
import { getDatabase } from '@/utils/database';
import { DATABASE_IDS } from '@/config';

import { ProposalsProps } from './Proposals.types';

export default async function Proposals({
	title = '',
}: ProposalsProps) {
	const tracks: ITrack[] | undefined = await getDatabase(DATABASE_IDS.PROPOSALS);

	return (
		<section className="my-4 flex flex-col items-center gap-y-3 sm:gap-y-6 lg:my-0">
			<header className="flex max-w-prose flex-col items-center text-center">
				<h1 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
					{ title }
				</h1>
			</header>

			{(!tracks || !tracks.length) && (
				<EmptyState message="Er zijn nog geen vadsige drops toegevoegd." />
			)}

			{(!!tracks && !!tracks.length) && (
				<ul className='flex w-full max-w-2xl flex-col gap-y-8 lg:gap-y-10'>
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