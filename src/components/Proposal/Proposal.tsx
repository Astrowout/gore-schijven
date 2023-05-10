'use client';

import formatRelative from 'date-fns/formatRelative';
import JSConfetti from 'js-confetti';

import { ProposalProps } from './Proposal.types';

let confetti: JSConfetti | null = null;

export default function Proposal({
	likes = 0,
	url = '',
	status = 'To be reviewed',
	createdTime = '',
}: ProposalProps) {
	const embedUrl = `${url.replace('https://open.spotify.com/track/', 'https://open.spotify.com/embed/track/')}?theme=0`;

	const handleLike = () => {
		// if (res) {
		confetti = new JSConfetti();
		confetti.addConfetti({
			emojis: ['💜', '🦐'],
			emojiSize: 40,
			confettiNumber: 20,
		});
		// } else if (confetti) {
		// 	confetti.clearCanvas();
		// }
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
			></iframe>

			<div className='flex items-start justify-between flex-wrap gap-x-4 gap-y-2 mt-2'>
				<div className='flex flex-col items-start'>
					<p className='text-neutral-400 text-sm mt-2 rounded-full py-0.5 px-2.5 border border-neutral-600 bg-neutral-900'>
						{status}
					</p>

					<p className='text-neutral-500 text-sm mt-2'>
						{formatRelative(new Date(createdTime), new Date())}
					</p>
				</div>

				<div className='flex items-center pr-4 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg'>
					<button
						className='flex items-center mr-4 justify-center rounded-full w-12 h-12 shadow-lg bg-neutral-950 border border-neutral-700 transition hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10'
						type="button"
						onClick={handleLike}
					>
						💜

						<span className='sr-only'>
							Like song
						</span>
					</button>

					<span className='text-white font-bold'>
						{likes}
					</span>
				</div>
			</div>
		</article>
	);
};