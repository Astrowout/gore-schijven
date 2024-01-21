import { create } from "zustand";

import { ISearchStore } from "./types";

export default create<ISearchStore>((set) => ({
    query: "",
    selectedTrack: null,
    setQuery: (query) => set({ query }),
    setSelectedTrack: (track) => set({ selectedTrack: track }),
}));