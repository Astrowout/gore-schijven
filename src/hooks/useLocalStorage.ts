import { UserStore } from '@/store';
import {
    useEffect,
    useRef,
} from 'react';

const STORAGE_KEY = 'likes';

export default function useLocalStorage() {
    const userLikes = UserStore((state) => state.likes);
    const setUserLikes = UserStore((state) => state.setLikes);
    const isFirstRender = useRef(true);

    const toggleLike = (id: string, type: 'like' | 'dislike') => {
        const newLikes = [...userLikes];

        if (type === 'like') {
            newLikes.push(id);
        } else if (type === 'dislike') {
            const likeIndex = newLikes.indexOf(id);

            if (likeIndex > -1) {
                newLikes.splice(likeIndex, 1);
            }
        }

        setUserLikes(newLikes);
    };

    useEffect(() => {
        if (isFirstRender) {
            const storedLikes = window.localStorage.getItem(STORAGE_KEY);
            setUserLikes(storedLikes ? JSON.parse(storedLikes) : []);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userLikes));
    }, [userLikes]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        userLikes,
        toggleLike,
    };
}