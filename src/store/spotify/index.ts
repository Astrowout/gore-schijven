import create from 'zustand';

import { ISpotifyStore } from './types';

export default create<ISpotifyStore>((set) => ({
	accessToken: '',
	setAccessToken: (token) => set({ accessToken: token }),
}));