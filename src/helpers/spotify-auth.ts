export const getAccessToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const encodedData = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedData}`
            },
            cache: "no-store" as RequestCache,
        };

        // Create Checkout Sessions from body params.
        const res = await fetch(`${process.env.SPOTIFY_ACCOUNT_URL}/api/token?` + params, config);

        const { access_token } = await res.json();

        return access_token;
    } catch (err) {
        console.error(err);
    }
}