'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import * as Popover from '@radix-ui/react-popover';

import { Track } from '@/components';
import { SearchStore } from '@/store';

import { SearchInputProps } from './SearchInput.types';

export default function SearchInput({}: SearchInputProps) {
	const query = SearchStore((state) => state.query);
	const setQuery = SearchStore((state) => state.setQuery);
	const selectedTrack = SearchStore((state) => state.selectedTrack);
	const setSelectedTrack = SearchStore((state) => state.setSelectedTrack);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleRemoveSong = () => {
		setSelectedTrack(null);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<Popover.Trigger asChild>
			<div className="relative w-full">
				<input
					onChange={(e) => setQuery(e.target.value)}
					className={clsx('h-14 w-full appearance-none rounded-full border border-neutral-700 bg-neutral-800 px-6 text-white shadow-inner placeholder:text-neutral-600 focus:border-purple-500 focus:outline-none', {
						'pointer-events-none': !!selectedTrack,
						'pointer-events-auto': !selectedTrack,
					})}
					placeholder={selectedTrack ? '' : 'Zoek een gore schijf op titel, artiest...'}
					ref={inputRef}
					autoComplete="off"
					value={query}
				/>

				{selectedTrack && (
					<span className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 items-center justify-between gap-x-3">
						<Track
							album={selectedTrack.album}
							name={selectedTrack.name}
							artists={selectedTrack.artists}
							coverSize="w-10 h-10"
						/>

						<button
							className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-600 transition hover:scale-110 hover:text-neutral-500"
							type="button"
							onClick={handleRemoveSong}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>

							<span className="sr-only">
								Remove selected song
							</span>
						</button>
					</span>
				)}
			</div>
		</Popover.Trigger>
	);
};