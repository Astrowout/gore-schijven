'use client';

import JSConfetti from 'js-confetti';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';

import { validateEmail } from '@/utils';
import { useNotion } from '@/hooks';
import { SearchStore } from '@/store';
import {
	Button,
	Input,
	SearchInput,
	Success,
	Suggestions,
} from '@/components';

import { SearchProps } from './Search.types';

let confetti: JSConfetti | null = null;

export default function Search({
	accessToken = '',
}: SearchProps) {
	const query = SearchStore((state) => state.query);
	const selectedTrack = SearchStore((state) => state.selectedTrack);
	const setSelectedTrack = SearchStore((state) => state.setSelectedTrack);
	const { result, isLoading, resetResult, createPage } = useNotion();

	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const validateForm = () => {
		setError('');

		if (!selectedTrack) {
			setError('Elaba viezerik, je hebt nog geen lied gekozen.');
			return false;
		}

		if (!email) {
			setError('Elaba viezerik, je moet jouw e-mailadres nog invullen.');
			return false;
		}

		if (!validateEmail(email)) {
			setError('Elaba viezerik, jouw e-mailadres lijkt niet te kloppen.');
			return false;
		}

		return true;
	};

	const onSubmit = async () => {
		const isValid = validateForm();

		if (!isValid) {
			return;
		}

		try {
			await createPage(selectedTrack!, email);
		} catch (error) {
			setError('Oeps, er liep iets mis. Wees gerust, het ligt niet aan jou maar aan onze vuile code.');
		}
	};

	const shootConfetti = () => {
		if (confetti) {
			confetti.clearCanvas();
		}

		confetti = new JSConfetti();
		confetti.addConfetti({
			emojis: ['💜'],
			emojiSize: 69,
			confettiNumber: 40,
		});
	};

	useEffect(() => {
		if (selectedTrack) {
			setError('');
		}
	}, [selectedTrack]);

	useEffect(() => {
		if (result) {
			setSelectedTrack(null);
			setEmail('');
			shootConfetti();
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