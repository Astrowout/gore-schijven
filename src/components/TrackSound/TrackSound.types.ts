import { TComponent } from "@/types";

export enum PlaySize {
    Base = "base",
    Sm = "sm",
}

export type TTrackSoundProps = TComponent & {
    id: string;
    preview: string;
    size?: PlaySize;
}