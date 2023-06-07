'use client';

import {
	useState,
	useEffect,
} from 'react';
import clsx from 'clsx';
import formatRelative from 'date-fns/formatRelative';
import nl from 'date-fns/locale/nl';
import JSConfetti from 'js-confetti';

import {
	useLocalStorage,
	useNotion,
} from '@/hooks';
import { Status } from '@/types';
import { StatusTag } from '@/components';

import { ProposalProps } from './Proposal.types';

let confetti: JSConfetti | null = null;

export default function Proposal({
	notionPageId = '',
	likes = 0,
	url = '',
	status = Status.TO_BE_REVIEWED,
	createdTime = '',
}: ProposalProps) {
	const [optimisticLikes, setOptimisticLikes] = useState(likes);
	const [date, setDate] = useState<string>('');
	const {
		isLoading,
		toggleLike: saveLikeInDb,
	} = useNotion();
	const {
		userLikes,
		toggleLike: saveLikeInLocalstorage,
	} = useLocalStorage();

	const hasUserLiked = userLikes.includes(notionPageId);

	const shootConfetti = () => {
		confetti = new JSConfetti();
		confetti.addConfetti({
			emojis: ['💜', '🦐'],
			emojiSize: 64,
			confettiNumber: 20,
		});
	};

	const likeTrack = () => {
		setOptimisticLikes(optimisticLikes + 1);

		saveLikeInLocalstorage(notionPageId, 'like');
		saveLikeInDb(notionPageId, 'like');

		shootConfetti();
	};

	const dislikeTrack = async () => {
		const newOptimisticLikes = optimisticLikes > 0 ? optimisticLikes - 1 : 0;
		setOptimisticLikes(newOptimisticLikes);

		saveLikeInLocalstorage(notionPageId, 'dislike');
		saveLikeInDb(notionPageId, 'dislike');
	};

	const toggleLike = () => {
		if (!hasUserLiked) {
			likeTrack();
		} else {
			dislikeTrack();
		}
	};

	useEffect(() => {
		setDate(formatRelative(new Date(createdTime), new Date(), { locale: nl }));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const embedUrl = `${url.replace('https://open.spotify.com/track/', 'https://open.spotify.com/embed/track/')}?theme=0`;

	return (
		<article className='flex flex-col'>
			<iframe
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				className="rounded-xl shadow-xl"
				frameBorder="0"
				height="152"
				loading="lazy"
				src={embedUrl}
				title="GORE SCHIJVEN™ Spotify track proposal"
				width="100%"
			/>

			<div className='mt-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-2'>
				<div className='flex flex-col items-start'>
					{date && (
						<p
							suppressHydrationWarning
							className='text-sm text-neutral-500'
						>
							{date}
						</p>
					)}

					<StatusTag
						className="mt-1.5"
						status={status}
					>
						{status}
					</StatusTag>
				</div>

				<div
					className={clsx('flex items-center rounded-full border bg-neutral-950 shadow-lg', {
						'border-purple-800': hasUserLiked,
						'border-neutral-800': !hasUserLiked,
					})}
				>
					<button
						className={clsx('group flex h-12 w-12 items-center justify-center rounded-full border bg-neutral-950 shadow-lg transition hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20', {
							'border-purple-500': hasUserLiked,
							'border-neutral-700': !hasUserLiked,
						})}
						disabled={isLoading}
						type="button"
						onClick={toggleLike}
					>
						<svg
							className={clsx('mt-px h-6 w-6 text-purple-600 transition group-hover:scale-125', {
								'fill-purple-600': hasUserLiked,
								'fill-transparent': !hasUserLiked,
							})}
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
								strokeLinecap="round"
								strokeLinejoin="round"
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