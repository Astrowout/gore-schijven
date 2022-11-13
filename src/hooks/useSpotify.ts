import { useCallback, useEffect, useState } from "react";

const LIMIT = 30;

export default function useSpotify(token: string) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSongs = useCallback(async (query: string) => {
        try {            
            setIsLoading(true);
        
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/search?q=${query}&type=track&limit=${LIMIT}`, {
                cache: "no-store",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
    
            const { tracks: { items } } = await res.json();

            setResults(items);
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        return () => {
            setResults([]);
        }
    }, []);
    
    return {
        results,
        isLoading,
        getSongs,
    }
  }