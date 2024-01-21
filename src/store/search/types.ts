import { TTrackDto } from "@/types";

export interface ISearchStore {
    query: string;
    selectedTrack: TTrackDto | null;
    setQuery: (query: string) => void;
    setSelectedTrack: (track: TTrackDto | null) => void;
}