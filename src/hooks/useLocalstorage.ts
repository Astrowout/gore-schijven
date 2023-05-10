import { UserStore } from '@/store';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'likes';

export default function useLocalStorage() {
	const userLikes = UserStore((state) => state.likes);
	const setUserLikes = UserStore((state) => state.setLikes);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const saveLike = (id: string, type: 'like' | 'dislike') => {
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

			return;
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);

			return;
		}

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userLikes));
	}, [userLikes]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		userLikes,
		saveLike,
	};
}