'use client';

import { MouseEvent, useEffect } from 'react';

import { PlayerProps } from './Player.types';

import { Progress } from '@/components';
import { PlayerStore } from '@/store';

let sound: any = null;

export default function Player({
	id = '',
	preview = '',
}: PlayerProps) {
	const playingId = PlayerStore((state) => state.playingId);
	const setPlayingId = PlayerStore((state) => state.setPlayingId);
	const isPlaying = playingId === id;

	const handleSound = (e: MouseEvent) => {
		e.stopPropagation();

		if (sound && isPlaying) {
			handlePause();
		} else {
			handlePlay();
		}
	};

	const handlePlay = () => {
		if (sound) {
			handlePause();
		}

		sound = new Audio(preview);

		initSoundEvents();

		sound.play();
		setPlayingId(id);
	};

	const handlePause = () => {
		sound.pause();
		sound = null;
		setPlayingId('');
	};

	const initSoundEvents = () => {
		sound.addEventListener('ended', handlePause);
	};

	useEffect(() => {
		return () => {
			if (sound) {
				sound.removeEventListener('ended', handlePause);
				handlePause();
			}
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<span className="w-6 h-6 flex-shrink-0">
			{preview && (
				<button
					className="w-full h-full flex items-center justify-center text-neutral-600 transition hover:scale-110 hover:text-neutral-500"
					onClick={handleSound}
					type="button"
				>
					{isPlaying ? (
						<span className="relative">
							<Progress
								isPlaying={isPlaying}
								className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							/>

							<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						</span>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
						</svg>
					)}
				</button>
			)}
		</span>
	);
};