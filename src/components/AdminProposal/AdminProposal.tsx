'use client';

import {
	useState,
	useEffect,
} from 'react';
import formatRelative from 'date-fns/formatRelative';
import nl from 'date-fns/locale/nl';

import { Status } from '@/types';
import { Select } from '@/components';

import { AdminProposalProps } from './AdminProposal.types';
import clsx from 'clsx';
import { getStatusSelectClasses } from '@/utils';

export default function AdminProposal({
	notionPageId = '',
	likes = 0,
	url = '',
	status = Status.TO_BE_REVIEWED,
	createdTime = '',
}: AdminProposalProps) {
	const [activeStatus, setActiveStatus] = useState(status);
	const [date, setDate] = useState<string>('');

	useEffect(() => {
		setDate(formatRelative(new Date(createdTime), new Date(), { locale: nl }));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const selectStatus = (status: Status) => {
		if (window.confirm('Are you sure you want to change the status of this proposal? This will send an email to the user who proposed this track with feedback.')) {
			console.log(status);
			console.log(notionPageId);
			setActiveStatus(status);
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