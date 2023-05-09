export interface IPlayerStore {
    playingId: string;
    setPlayingId: (id: string) => void;
}