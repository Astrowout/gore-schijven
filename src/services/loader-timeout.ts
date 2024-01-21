export async function loaderTimeout () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 1400);
    });
}