export interface ILoaderStore {
    isLoading: boolean;
    setLoadingState: (state: boolean) => void;
}