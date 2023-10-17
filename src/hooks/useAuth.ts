import { useState } from 'react';

export default function useAuth() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (password: string) => {
        try {
            setIsLoading(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
                method: 'POST',
                body: JSON.stringify({
                    password,
                }),
            });
            const data = await res.json();

            if (data.error) {
                throw new Error('Elaba viezerik, je hebt een fout paswoord ingevuld.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleLogin,
    };
}