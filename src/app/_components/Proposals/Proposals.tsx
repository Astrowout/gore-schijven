import {
	Proposal,
	EmptyState,
} from '@/app/_components';
import { ITrack } from '@/types';

import { ProposalsProps } from './Proposals.types';

export default async function Proposals({
	title = '',
}: ProposalsProps) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/proposals`, {
		cache: 'no-store',
		next: {
			tags: ['proposals'],
		},
	});

	const { data: tracks }: { data: ITrack[] } = await res.json();

	return (
		<section className="my-4 flex flex-col items-center gap-y-3 sm:gap-y-6 lg:my-0">
			<header className="flex max-w-prose flex-col items-center text-center">
				<h1 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
					{ title }
				</h1>
			</header>

			{(!tracks || !tracks.length) && (
				<EmptyState
					icon={
						<svg
							className="h-16 w-16 text-neutral-600"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					}
					message="Er zijn nog geen vadsige drops toegevoegd."
				/>
			)}

			{(!!tracks && !!tracks.length) && (
				<ul className='flex w-full max-w-2xl flex-col gap-y-8 lg:gap-y-10'>
					{tracks.map((track) => (
						<li key={track.id}>
							<Proposal
								createdTime={track.createdTime}
								likes={track.likes}
								notionPageId={track.id}
								status={track.status}
								url={track.spotifyUrl}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};