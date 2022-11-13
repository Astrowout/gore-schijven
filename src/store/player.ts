import create from "zustand";

type PlayerState = {
    playingId: string;
    setPlayingId: (id: string) => void;
}

export default create<PlayerState>((set) => ({
    playingId: "",
    setPlayingId: (id) => set({ playingId: id }),
}));