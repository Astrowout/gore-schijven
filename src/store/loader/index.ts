import create from 'zustand';

import { ILoaderStore } from './types';

export default create<ILoaderStore>((set) => ({
    isLoading: false,
    setLoadingState: (state) => set({
        isLoading: state,
    }),
}));