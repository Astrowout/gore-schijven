import create from 'zustand';

import { IUserStore } from './types';

export default create<IUserStore>((set) => ({
    likes: [],
    setLikes: (likes) => set({ likes }),
}));