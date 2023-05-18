'use client';

import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import {
	useCallback, useEffect,
} from 'react';
import debounce from 'lodash/debounce';

import {
	EmptyState,
	Player,
	Track,
} from '@/app/_components';

import { SuggestionsProps } from './Suggestions.types';
import { SearchStore } from '@/store';
import { useSpotify } from '@/hooks';
import { ITrackDto } from '@/types';

export default function Suggestions({
	accessToken = '',
}: SuggestionsProps) {
	const query = SearchStore((state) => state.query);
	const setQuery = SearchStore((state) => state.setQuery);
	const setSelectedTrack = SearchStore((state) => state.setSelectedTrack);
	const {
		tracks, getTracks,
	} = useSpotify(accessToken);

	const fetchTracks = useCallback(debounce((value) => { // eslint-disable-line react-hooks/exhaustive-deps
		if (!!value) {
			getTracks(value);
		}
	}, 300), []);

	useEffect(() => {
		fetchTracks(query);
	}, [query]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSelectTrack = (track: ITrackDto) => {
		setSelectedTrack(track);
		setQuery('');
	};

	return (
		<Popover.Content
			align="start"
			avoidCollisions={false}
			className="z-20 max-h-80 w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-lg border border-neutral-600 bg-neutral-900 shadow-xl"
			sideOffset={6}
			onOpenAutoFocus={(e) => e.preventDefault()}
		>
			{!tracks.length && (
				<EmptyState message="Geen resultaten gevonden" />
			)}

			{!!tracks.length && (
				<ul className="divide-y divide-neutral-800">
					{tracks.map((item: ITrackDto) => (
						<li key={item.id}>
							<div
								className={clsx('flex w-full cursor-pointer items-center gap-x-3 p-3 hover:bg-neutral-800 focus:bg-purple-500/10')}
								role="button"
								onClick={() => handleSelectTrack(item)}
							>
								<Player
									id={item.id}
									preview={item.preview_url}
								/>

								<Track
									album={item.album}
									artists={item.artists}
									name={item.name}
								/>
							</div>
						</li>
					))}
				</ul>
			)}
		</Popover.Content>
	);
};