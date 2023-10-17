'use client';

import {
    useState,
    useEffect,
} from 'react';
import formatRelative from 'date-fns/formatRelative';
import nl from 'date-fns/locale/nl';
import clsx from 'clsx';

import { Status } from '@/types';
import {
    Select,
    Tooltip,
} from '@/components';
import {
    getStatusSelectClasses,
    ConfettiTypes,
    shootConfetti,
    ConditionalWrapper,
} from '@/utils';
import { useNotion } from '@/hooks';

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

    const { updateStatus } = useNotion();

    useEffect(() => {
        setDate(formatRelative(new Date(createdTime), new Date(), { locale: nl }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const sendFeedback = async (status: Status) => {
        try {
            await updateStatus(notionPageId, {
                status,
                metadata,
            });

            setActiveStatus(status);
            shootConfetti(ConfettiTypes.HEARTS);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const selectStatus = (status: Status) => {
        setError('');

        if (window.confirm('Are you sure you want to change the status of this proposal? If the track is approved or rejected, the user will get an email with AI generated feedback.')) {
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

                    <ConditionalWrapper
                        condition={activeStatus !== Status.TO_BE_REVIEWED}
                        wrapper={children => (
                            <Tooltip content="You can&apos;t change the status of a proposal that has been reviewed in the past.">
                                {children}
                            </Tooltip>
                        )}
                    >
                        <Select
                            className={clsx('mt-1.5', getStatusSelectClasses(activeStatus))}
                            disabled={activeStatus !== Status.TO_BE_REVIEWED}
                            name="status"
                            options={Object.values(Status)}
                            value={activeStatus}
                            onValueChange={selectStatus}
                        />
                    </ConditionalWrapper>

                    {error && (
                        <p className="mt-2 max-w-prose text-sm text-red-400">
                            {error}
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