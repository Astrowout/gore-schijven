import { create } from "zustand";

import { TMotionStore } from "./types";

export default create<TMotionStore>((set) => ({
    isInView: true,
    setIsInView: (state) => set({
        isInView: state,
    }),
}));