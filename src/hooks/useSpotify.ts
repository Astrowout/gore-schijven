import { useCallback, useEffect, useState } from "react";

const LIMIT = 30;

export default function useSpotify(token: string) {
    const [tracks, setTracks] = useState([]);

    const getTracks = useCallback(async (query: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/search?q=${query}&type=track&limit=${LIMIT}`, {
                cache: "no-store",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
    
            const { tracks: { items } } = await res.json();

            setTracks(items);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        return () => {
            setTracks([]);
        }
    }, []);
    
    return {
        tracks,
        getTracks,
    }
  }