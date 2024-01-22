"use server";

const LIMIT = 15;

export const getSpotifyAccessToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        const encodedData = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

        // Create Checkout Sessions from body params.
        const res = await fetch(`${process.env.SPOTIFY_ACCOUNT_URL}/api/token?` + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${encodedData}`,
            },
            cache: "no-store",
        });

        const { access_token } = await res.json();

        return access_token;
    } catch (err) {
        console.error(err);
    }
};

export const getTracks = async (query: string) => {
    try {
        const accessToken = await getSpotifyAccessToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/search?q=${query}&type=track&limit=${LIMIT}`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const { tracks: { items } } = await res.json();

        return items;
    } catch (error) {
        console.error(error);
    }
};