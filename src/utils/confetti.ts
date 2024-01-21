import JSConfetti from "js-confetti";

let confetti: JSConfetti | null = null;

export enum ConfettiTypes {
    HEARTS = "hearts",
}

const getConfettiConfig = (type: ConfettiTypes) => {
    switch (type) {
    case ConfettiTypes.HEARTS:
        return {
            emojis: ["💜"],
            emojiSize: 69,
            confettiNumber: 40,
        };
    }
};

export const shootConfetti = async (type: ConfettiTypes) => {
    if (confetti) {
        confetti.clearCanvas();
    }

    const config = getConfettiConfig(type);

    confetti = new JSConfetti();
    await confetti.addConfetti(config);
    confetti.clearCanvas();
};