export interface ILoaderStore {
    isFeedbackLoading: boolean;
    isEmailLoading: boolean;
    isNotionLoading: boolean;
    setFeedbackLoading: (state: boolean) => void;
    setEmailLoading: (state: boolean) => void;
    setNotionLoading: (state: boolean) => void;
}