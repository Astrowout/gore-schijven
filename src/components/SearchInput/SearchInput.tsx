import { Combobox } from '@headlessui/react'
import { useCallback, useRef } from 'react';
import debounce from "lodash/debounce";

import { SearchInputProps } from "./SearchInput.types";
import Track from '../Track/Track';

export default function SearchInput({
    debounceTimeout = 800,
    selectedTrack = null,
    onChange = () => null,
    onRemoveTrack = () => null,
}: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceFn = useCallback(debounce(onChange, debounceTimeout), []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRemoveSong = () => {
        onRemoveTrack();

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <div className="relative">
            <Combobox.Input
                onChange={(e) => debounceFn(e.target.value)}
                className={`${selectedTrack ? "pointer-events-none" : "pointer-events-auto"} w-full h-14 px-6 rounded-full border border-neutral-700 focus:border-purple-500 focus:outline-none text-white placeholder:text-neutral-600 bg-neutral-800 shadow-inner`}
                placeholder={selectedTrack ? "" : "Zoek een gore schijf op titel, artiest..."}
                ref={inputRef}
                autoComplete="off"
            />

            {selectedTrack && (
                <span className="absolute top-1/2 -translate-y-1/2 inset-x-5 gap-x-3 flex items-center justify-between">
                    <Track
                        album={selectedTrack.album}
                        name={selectedTrack.name}
                        artists={selectedTrack.artists}
                        coverSize="w-10 h-10"
                    />

                    <button
                        className="w-6 h-6 flex flex-shrink-0 items-center justify-center text-neutral-600 transition hover:scale-110 hover:text-neutral-500"
                        type="button"
                        onClick={handleRemoveSong}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="sr-only">Remove selected song</span>
                    </button>
                </span>
            )}
        </div>
    );
};