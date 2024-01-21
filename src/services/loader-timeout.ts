export const loaderTimeout = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1200);
    });
};