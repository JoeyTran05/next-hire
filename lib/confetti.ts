import confetti from "canvas-confetti";

export const fireConfetti = () => {
	confetti({
		particleCount: 120,
		spread: 70,
		origin: { y: 0.6 },
	});

	// Optional burst
	setTimeout(() => {
		confetti({
			particleCount: 80,
			spread: 100,
			origin: { y: 0.6 },
		});
	}, 250);
};
