"use client";

import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react";
import { useSpotify } from "../../hooks";

import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Suggestions from "../Suggestions/Suggestions";

import { SearchProps } from "./Search.types";

export default function Search({
    accessToken = "",
}: SearchProps) {
    const { results, isLoading, setIsLoading, getSongs } = useSpotify(accessToken);
    const [selectedSong, setSelectedSong] = useState<any>(null);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async () => {
        if (!selectedSong) {
            setError("Elaba, je hebt nog geen lied gekozen viezerik.");
        }

        // await notionapi fetch
    }

    useEffect(() => {
        if (selectedSong) {
            setError("");
        }
    }, [selectedSong]);

    useEffect(() => {
        if (query) {
            getSongs(query);
        }
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="flex flex-col items-center gap-y-6 self-stretch mx-auto w-full max-w-md"
        >
            <Combobox onChange={setSelectedSong}>
                <div className="relative self-stretch">
                    {error && (
                        <p className="text-sm text-red-400 mb-2">
                            { error }
                        </p>
                    )}

                    <SearchInput
                        selectedSong={selectedSong}
                        onChange={setQuery}
                        onRemoveSong={() => setSelectedSong(null)}
                    />

                    <Suggestions
                        results={results}
                        isLoading={isLoading || !query}
                    />
                </div>
            </Combobox>

            <Button
                type="submit"
                onClick={onSubmit}
            >
                Versturen
            </Button>
        </div>
    );
};