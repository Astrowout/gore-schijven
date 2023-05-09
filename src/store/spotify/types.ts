export interface ISpotifyStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
}