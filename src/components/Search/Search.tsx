"use client";

import { Combobox, Transition } from "@headlessui/react"
import { useEffect, useState } from "react";
import { validateEmail } from "../../helpers/validate";
import { useSpotify, useNotion } from "../../hooks";

import Button from "../Button/Button";
import Input from "../Input/Input";
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
    const [email, setEmail] = useState("");
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        setError("");
    
        if (!selectedTrack) {
            setError("Elaba viezerik, je hebt nog geen lied gekozen.");
            return;
        }

        if (!email) {
            setError("Elaba viezerik, je moet jouw e-mailadres nog invullen.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Elaba viezerik, jouw e-mailadres lijkt niet te kloppen.");
            return;
        }

        try {
            await postProposal(selectedTrack, email);

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
        <div className="flex flex-col items-center self-stretch mx-auto w-full max-w-md p-4">
            <Combobox onChange={setSelectedTrack}>
                {({ open }) => (
                    <div className="relative self-stretch">
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

            <Input
                name="email"
                label="Jouw e-mailadres"
                placeholder="viezevuilegore@gmail.com"
                onChange={setEmail}
                className="mt-6"
            />

            <Button
                onClick={onSubmit}
                isLoading={isLoading}
                className="mt-6"
            >
                Versturen
            </Button>

            {error && (
                <p className="text-sm text-red-400 mt-4 max-w-prose">
                    { error }
                </p>
            )}
        </div>
    );
};