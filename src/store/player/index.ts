import create from 'zustand';

import { IPlayerStore } from './types';

export default create<IPlayerStore>((set) => ({
    playingId: '',
    setPlayingId: (id) => set({ playingId: id }),
}));