import { ITrackDto } from '@/types';

export interface ISearchStore {
    query: string;
    selectedTrack: ITrackDto | null;
    setQuery: (query: string) => void;
    setSelectedTrack: (track: ITrackDto | null) => void;
}