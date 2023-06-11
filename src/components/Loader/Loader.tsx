'use client';

import {
	useEffect,
	useState,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { LoaderStore } from '@/store';

export default function Loader() {
	const [text, setText] = useState('Loading...');
	const state =  LoaderStore();

	useEffect(() => {
		if (state.isFeedbackLoading) {
			setText('Generating feedback...');
		} else if (state.isNotionLoading) {
			setText('Updating database...');
		} else if (state.isEmailLoading) {
			setText('Sending email...');
		}
	}, [state]);

	const isLoading = state.isFeedbackLoading || state.isEmailLoading || state.isNotionLoading;

	return (
		<Dialog.Root open={isLoading}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 z-40 bg-neutral-900/80 backdrop-blur' />

				<Dialog.Content className='fixed left-1/2 top-1/2 z-50 flex max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center focus:outline-none'>
					<svg className="h-6 w-6 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

						<path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
					</svg>

					<Dialog.Title className="mt-3 text-center text-sm text-neutral-500">
						{text}
					</Dialog.Title>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};