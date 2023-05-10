'use client';

import { useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';

import { SearchInputProps } from './SearchInput.types';

import { Track } from '@/components';
import { useSearchStore } from '@/store';
import clsx from 'clsx';

export default function SearchInput({}: SearchInputProps) {
	const query = useSearchStore((state) => state.query);
	const setQuery = useSearchStore((state) => state.setQuery);
	const selectedTrack = useSearchStore((state) => state.selectedTrack);
	const setSelectedTrack = useSearchStore((state) => state.setSelectedTrack);
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
					className={clsx('w-full appearance-none h-14 px-6 rounded-full border border-neutral-700 focus:border-purple-500 focus:outline-none text-white placeholder:text-neutral-600 bg-neutral-800 shadow-inner', {
						'pointer-events-none': !!selectedTrack,
						'pointer-events-auto': !selectedTrack,
					})}
					placeholder={selectedTrack ? '' : 'Zoek een gore schijf op titel, artiest...'}
					ref={inputRef}
					autoComplete="off"
					value={query}
				/>

				{selectedTrack && (
					<span className="absolute top-1/2 -translate-y-1/2 inset-x-5 gap-x-3 flex items-center justify-between">
						<Track
							album={selectedTrack.album}
							name={selectedTrack.name}
							artists={selectedTrack.artists}
							coverSize="w-10 h-10"
						/>

						<button
							className="w-6 h-6 flex flex-shrink-0 items-center justify-center text-neutral-600 transition hover:scale-110 hover:text-neutral-500"
							type="button"
							onClick={handleRemoveSong}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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