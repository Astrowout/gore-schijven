"use client";

import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react";
import { useSpotify, useNotion } from "../../hooks";

import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Success from "../Success/Success";
import Suggestions from "../Suggestions/Suggestions";

import { SearchProps } from "./Search.types";

export default function Search({
    accessToken = "",
}: SearchProps) {
    const { results, isLoading: isSpotifyLoading, getSongs } = useSpotify(accessToken);
    const { result, isLoading, postProposal } = useNotion();
    const [selectedSong, setSelectedSong] = useState<any>(null);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async () => {
        if (!selectedSong) {
            setError("Elaba viezerik, je hebt nog geen lied gekozen.");
            return;
        }

        try {
            await postProposal(selectedSong);
        } catch (error) {
            setError("Oeps, er liep iets mis. Wees gerust, het ligt niet aan jou maar aan onze vuile code.");
        }
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

    if (result) {
        return (
            <Success message="We hebben jouw vieze drop goed ontvangen! Het ingezonden degoutant kabaal wordt binnen de 27 werkdagen gereviewd." />
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-6 self-stretch mx-auto w-full max-w-md">
            <Combobox onChange={setSelectedSong}>
                <div className="relative self-stretch">
                    {error && (
                        <p className="text-sm text-red-400 mb-2 max-w-prose">
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
                        isLoading={isSpotifyLoading || !query}
                    />
                </div>
            </Combobox>

            <Button
                type="submit"
                onClick={onSubmit}
                isLoading={isLoading}
            >
                Versturen
            </Button>
        </div>
    );
};