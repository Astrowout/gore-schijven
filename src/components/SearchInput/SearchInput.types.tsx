export type SearchInputProps = {
    onChange: (value: string) => void;
    onRemoveSong: () => void;
    selectedSong?: any;
    debounceTimeout?: number;
}