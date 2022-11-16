import { Variants } from "framer-motion";

export const headerAnim: Variants = {
	initial: {
		width: "100%",
		rotate: 0,
	},
	animate: {
		width: ["100%", "0%", "100%"],
		rotate: -1.5,
		transition: {
			type: "keyframes",
			delay: 1,
			delayChildren: 1.3,
			duration: 0.6,
		}
	},
};
 
export const textAnim: Variants = {
	initial: {
		scale: 1.8,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			opacity: {
				duration: 0.3,
			},
			default: {
				type: "spring",
				bounce: 0.4,
				duration: 1,
			}
		}
	},
};

export const layoutTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 1,
}