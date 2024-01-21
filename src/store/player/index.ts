import { create } from "zustand";
import { useShallow as shallow } from "zustand/react/shallow";

import { IPlayerStore } from "./types";

const PlayerStore = create<IPlayerStore>((set) => ({
    playingId: "",
    setPlayingId: (id) => set({ playingId: id }),
}));

export const getIsPlaying = (id: string) => PlayerStore(shallow((state) => state.playingId === id));

export default PlayerStore;
