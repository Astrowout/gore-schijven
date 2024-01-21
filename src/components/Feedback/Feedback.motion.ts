export const variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.6,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.6,
    },
};

export const transition = {
    duration: 0.2,
    ease: "backOut",
};