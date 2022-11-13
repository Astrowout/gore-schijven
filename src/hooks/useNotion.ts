import { useCallback, useEffect, useState } from "react";

export default function useNotion() {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postProposal = useCallback(async (song: any) => {
        try {            
            setIsLoading(true);

            const res = await fetch("/api/notion/page", {
                method: "POST",
                body: JSON.stringify(song),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const data = await res.json();

            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            setResult(null);
        }
    }, []);
    
    return {
        result,
        isLoading,
        postProposal,
    }
  }