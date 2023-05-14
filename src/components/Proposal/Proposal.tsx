'use client';

import { useState } from 'react';
import clsx from 'clsx';
import formatRelative from 'date-fns/formatRelative';
import nl from 'date-fns/locale/nl';
import JSConfetti from 'js-confetti';

import {
	useLocalstorage,
	useNotion,
} from '@/hooks';
import { Status } from '@/types';

import { ProposalProps } from './Proposal.types';

let confetti: JSConfetti | null = null;

export default function Proposal({
	notionPageId = '',
	likes = 0,
	url = '',
	status = Status.TO_BE_REVIEWED,
	createdTime = '',
}: ProposalProps) {
	const embedUrl = `${url.replace('https://open.spotify.com/track/', 'https://open.spotify.com/embed/track/')}?theme=0`;
	const { toggleLike: saveLikeInDb } = useNotion();
	const {
		userLikes,
		toggleLike: saveLikeInLocalstorage,
	} = useLocalstorage();
	const [optimisticLikes, setOptimisticLikes] = useState(likes);

	const hasUserLiked = userLikes.includes(notionPageId);

	const shootConfetti = () => {
		confetti = new JSConfetti();
		confetti.addConfetti({
			emojis: ['💜', '🦐'],
			emojiSize: 60,
			confettiNumber: 20,
		});
	};

	const likeTrack = () => {
		setOptimisticLikes(optimisticLikes + 1);

		saveLikeInDb(notionPageId, 'like');
		saveLikeInLocalstorage(notionPageId, 'like');

		shootConfetti();
	};

	const dislikeTrack = () => {
		const newLikes = optimisticLikes > 0 ? optimisticLikes - 1 : 0;
		setOptimisticLikes(newLikes);

		saveLikeInDb(notionPageId, 'dislike');
		saveLikeInLocalstorage(notionPageId, 'dislike');
	};

	const toggleLike = () => {
		if (!hasUserLiked) {
			likeTrack();
		} else {
			dislikeTrack();
		}
	};

	return (
		<article className='flex flex-col'>
			<iframe
				src={embedUrl}
				width="100%"
				height="152"
				frameBorder="0"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
				className="rounded-xl shadow-xl"
				title="GORE SCHIJVEN™ Spotify track proposal"
			></iframe>

			<div className='mt-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-2'>
				<div className='flex flex-col items-start'>
					<p
						className='text-sm text-neutral-500'
						suppressHydrationWarning
					>
						{formatRelative(new Date(createdTime), new Date(), { locale: nl })}
					</p>

					<p className='mt-2 rounded-full border border-neutral-600 bg-neutral-900 px-2.5 py-0.5 text-sm text-neutral-400'>
						{status}
					</p>
				</div>

				<div className={clsx('flex items-center rounded-full border bg-neutral-950 shadow-lg', {
					'border-purple-800': hasUserLiked,
					'border-neutral-800': !hasUserLiked,
				})}
				>
					<button
						className={clsx('group flex h-12 w-12 items-center justify-center rounded-full border bg-neutral-950 shadow-lg transition hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20', {
							'border-purple-500': hasUserLiked,
							'border-neutral-700': !hasUserLiked,
						})}
						type="button"
						onClick={toggleLike}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="currentColor"
							className={clsx('mt-px h-6 w-6 text-purple-600 transition group-hover:scale-125', {
								'fill-purple-600': hasUserLiked,
								'fill-transparent': !hasUserLiked,
							})}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>

						<span className='sr-only'>
							{hasUserLiked ? 'Dislike song' : 'Like song'}
						</span>
					</button>

					<span className='block min-w-[40px] text-center font-bold text-white'>
						{optimisticLikes}
					</span>
				</div>
			</div>
		</article>
	);
};