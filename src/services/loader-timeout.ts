export async function loaderTimeout () {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};