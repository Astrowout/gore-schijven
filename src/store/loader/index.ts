import { create } from "zustand";

import { TLoaderStore } from "./types";

export default create<TLoaderStore>((set) => ({
    isLoading: false,
    setLoadingState: (state) => set({
        isLoading: state,
    }),
}));