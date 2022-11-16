export type SearchInputProps = {
    onChange: (value: string) => void;
    onRemoveTrack: () => void;
    selectedTrack?: any;
    debounceTimeout?: number;
}