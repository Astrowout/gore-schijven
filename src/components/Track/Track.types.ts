import {
    TComponent,
    TTrackDto,
} from "@/types";

export type TTrackProps = TComponent & Partial<TTrackDto> & {
    coverSize?: string;
};