"use client";

import { Combobox, Transition } from "@headlessui/react"
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
    const { tracks, getTracks } = useSpotify(accessToken);
    const { result, isLoading, resetResult, postProposal } = useNotion();
    const [query, setQuery] = useState("");
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        if (!selectedTrack) {
            setError("Elaba viezerik, je hebt nog geen lied gekozen.");
            return;
        }

        try {
            await postProposal(selectedTrack);

            setSelectedTrack(null);
        } catch (error) {
            setError("Oeps, er liep iets mis. Wees gerust, het ligt niet aan jou maar aan onze vuile code.");
        }
    }

    useEffect(() => {
        if (selectedTrack) {
            setError("");
        }
    }, [selectedTrack]);

    useEffect(() => {
        if (!!query) {
            getTracks(query);
        }
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    if (result) {
        return (
            <Success message="We hebben jouw vieze drop goed ontvangen! Het ingezonden degoutant kabaal wordt binnen de 27 werkdagen gereviewd.">
                <Button onClick={resetResult}>
                    Stel nog een vieze schijf voor
                </Button>
            </Success>
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-6 self-stretch mx-auto w-full max-w-md">
            <Combobox onChange={setSelectedTrack}>
                {({ open }) => (
                <div className="relative self-stretch">
                    {error && (
                        <p className="text-sm text-red-400 mb-2 max-w-prose">
                            { error }
                        </p>
                    )}

                    <SearchInput
                        selectedTrack={selectedTrack}
                        onChange={setQuery}
                        onRemoveTrack={() => setSelectedTrack(null)}
                    />

                    <Transition
                        appear
                        show={open}
                    >
                        <Suggestions results={tracks} />
                    </Transition>
                </div>
                )}
            </Combobox>

            <Button
                onClick={onSubmit}
                isLoading={isLoading}
            >
                Versturen
            </Button>
        </div>
    );
};