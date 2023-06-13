import JSConfetti from 'js-confetti';

let confetti: JSConfetti | null = null;

export enum ConfettiTypes {
    HEARTS = 'hearts',
    MIXED = 'mixed',
}

const getConfettiConfig = (type: ConfettiTypes) => {
	switch (type) {
	case ConfettiTypes.HEARTS:
		return {
			emojis: ['💜'],
			emojiSize: 69,
			confettiNumber: 40,
		};
	case ConfettiTypes.MIXED:
		return {
			emojis: ['💜', '🦐'],
			emojiSize: 64,
			confettiNumber: 20,
		};
	}
};

export const shootConfetti = (type: ConfettiTypes) => {
	if (confetti) {
		confetti.clearCanvas();
	}

	const config = getConfettiConfig(type);

	confetti = new JSConfetti();
	confetti.addConfetti(config);
};