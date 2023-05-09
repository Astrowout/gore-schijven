'use client';

import { Combobox, Transition } from '@headlessui/react';

import {
	EmptyState,
	Player,
	Track,
} from '@/components';

import { SuggestionsProps } from './Suggestions.types';

export default function Suggestions({
	results = [],
}: SuggestionsProps) {
	return (
		<Transition.Child
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="transition-opacity duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="absolute z-20 origin-top top-full mt-2 max-h-80 w-full overflow-y-auto rounded-lg bg-neutral-900 border border-neutral-600 shadow-xl"
		>
			{!results.length && (
				<EmptyState message="Geen resultaten gevonden" />
			)}

			{!!results.length && (
				<Combobox.Options
					static
					className="divide-y divide-neutral-800"
				>
					{results.map((item: any) => (
						<Combobox.Option
							key={item.id}
							value={item}
							className={({ active }) => `${active ? 'bg-purple-900 bg-opacity-30' : ''} flex w-full px-3 py-3 gap-x-3 items-center hover:bg-neutral-800 cursor-pointer`}
						>
							<Player
								id={item.id}
								preview={item.preview_url}
							/>

							<Track
								album={item.album}
								name={item.name}
								artists={item.artists}
							/>
						</Combobox.Option>
					))}
				</Combobox.Options>
			)}
		</Transition.Child>
	);
};