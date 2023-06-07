'use client';

import {
	useState,
	useEffect,
} from 'react';
import formatRelative from 'date-fns/formatRelative';
import nl from 'date-fns/locale/nl';
import clsx from 'clsx';

import { Status } from '@/types';
import { Select } from '@/components';
import { getStatusSelectClasses } from '@/utils';
import {
	useEmail,
	useNotion,
	useOpenAi,
} from '@/hooks';

import { AdminProposalProps } from './AdminProposal.types';

export default function AdminProposal({
	notionPageId = '',
	likes = 0,
	url = '',
	status = Status.TO_BE_REVIEWED,
	createdTime = '',
	metadata,
}: AdminProposalProps) {
	const [activeStatus, setActiveStatus] = useState(status);
	const [date, setDate] = useState<string>('');
	const [error, setError] = useState<string>('');

	const { generateFeedback } = useOpenAi();
	const { sendEmail } = useEmail();
	const { setStatus } = useNotion();

	useEffect(() => {
		setDate(formatRelative(new Date(createdTime), new Date(), { locale: nl }));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const sendFeedback = async (status: Status) => {
		try {
			const feedback = await generateFeedback(status);
			await sendEmail(status, {
				...metadata,
				feedback,
			});
			await setStatus(notionPageId, status);

			// if (metadata && feedback) {
			// 	sendEmail(status, metadata);
			// }

		} catch (error: any) {
			setError(error.message);
		}
		console.log(notionPageId);

		// if (res) {
		// 	setStatus(notionPageId, status);
		// }
	};

	const selectStatus = (status: Status) => {
		setError('');

		if (status === Status.TO_BE_REVIEWED) {
			setActiveStatus(status);

			return;
		}

		if (window.confirm('Are you sure you want to change the status of this proposal? This will send an email to the user who proposed this track with feedback.')) {
			setActiveStatus(status);
			sendFeedback(status);
		}
	};

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

					<Select
						className={clsx('mt-1.5', getStatusSelectClasses(activeStatus))}
						name="status"
						options={Object.values(Status)}
						value={activeStatus}
						onValueChange={selectStatus}
					/>

					{error && (
						<p className="mt-2 max-w-prose text-sm text-red-400">
							{ error }
						</p>
					)}
				</div>

				<p>
					<span className='font-bold text-white'>
						{likes}
					</span>

					&nbsp;&nbsp;

					<span className='text-neutral-400'>
						{likes === 1 ? 'like' : 'likes'}
					</span>
				</p>
			</div>
		</article>
	);
};