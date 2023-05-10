'use client';

import JSConfetti from 'js-confetti';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';

import { validateEmail } from '@/utils';
import { useNotion } from '@/hooks';

import {
	Button,
	Input,
	SearchInput,
	Success,
	Suggestions,
} from '@/components';

import { SearchProps } from './Search.types';
import { useSearchStore } from '@/store';

let confetti: JSConfetti | null = null;

export default function Search({
	accessToken = '',
}: SearchProps) {
	const query = useSearchStore((state) => state.query);
	const selectedTrack = useSearchStore((state) => state.selectedTrack);
	const setSelectedTrack = useSearchStore((state) => state.setSelectedTrack);
	const { result, isLoading, resetResult, postProposal } = useNotion();

	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async () => {
		setError('');

		if (!selectedTrack) {
			setError('Elaba viezerik, je hebt nog geen lied gekozen.');
			return;
		}

		if (!email) {
			setError('Elaba viezerik, je moet jouw e-mailadres nog invullen.');
			return;
		}

		if (!validateEmail(email)) {
			setError('Elaba viezerik, jouw e-mailadres lijkt niet te kloppen.');
			return;
		}

		try {
			await postProposal(selectedTrack, email);

			setSelectedTrack(null);
		} catch (error) {
			setError('Oeps, er liep iets mis. Wees gerust, het ligt niet aan jou maar aan onze vuile code.');
		}
	};

	useEffect(() => {
		if (selectedTrack) {
			setError('');
		}
	}, [selectedTrack]);

	useEffect(() => {
		if (result) {
			confetti = new JSConfetti();
			confetti.addConfetti({
				emojis: ['💜'],
				emojiSize: 69,
				confettiNumber: 40,
			});
		} else if (confetti) {
			confetti.clearCanvas();
		}
	}, [result]); // eslint-disable-line react-hooks/exhaustive-deps

	if (result) {
		return (
			<Success message="We hebben jouw vieze drop goed ontvangen! Het ingezonden degoutant kabaal wordt binnen de 27 werkdagen gereviewd.">
				<Button onClick={resetResult}>
                    Stel nog een vieze schijf voor
				</Button>
			</Success>
		);
	}

	return (
		<div className="flex flex-col items-center self-stretch mx-auto w-full max-w-md">
			<Popover.Root open={!!query && !selectedTrack}>
				<SearchInput />

				<Suggestions accessToken={accessToken} />
			</Popover.Root>

			<Input
				name="email"
				label="Jouw e-mailadres"
				placeholder="viezevuilegore@gmail.com"
				onChange={setEmail}
				className="mt-6"
			/>

			<Button
				onClick={onSubmit}
				isLoading={isLoading}
				className="mt-6"
			>
                Versturen
			</Button>

			{error && (
				<p className="text-sm text-center text-red-400 mt-4 max-w-prose">
					{ error }
				</p>
			)}
		</div>
	);
};