import { useEffect, useState } from 'react';

const STORAGE_KEY = 'likes';

const storedLikes = localStorage.getItem(STORAGE_KEY) || JSON.stringify([]);

export default function useLocalStorage() {
	const [likes, setLikes] = useState<string[]>(JSON.parse(storedLikes));
	const [isFirstRender, setIsFirstRender] = useState(true);

	const saveLike = (id: string) => {
		setLikes([
			...likes,
			id,
		]);
	};

	const unsaveLike = (id: string) => {
		const newLikes = [...likes];
		const likeIndex = newLikes.indexOf(id);

		if (likeIndex > -1) {
			newLikes.splice(likeIndex, 1);
			setLikes(newLikes);
		}
	};

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
	}, [likes]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		likes,
		saveLike,
		unsaveLike,
	};
}