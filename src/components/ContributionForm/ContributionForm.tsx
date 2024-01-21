"use client";

import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import {
    FormEvent,
    useEffect,
    useState,
} from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SearchInput } from "@/components/SearchInput";
import { Success } from "@/components/Success";
import { Suggestions } from "@/components/Suggestions";
import { createProposal } from "@/services/actions";
import { SearchStore } from "@/store";
import {
    ConfettiTypes,
    shootConfetti,
    validateEmail,
} from "@/utils";

import { ContributionFormProps } from "./ContributionForm.types";

export default function ContributionForm ({
    accessToken = "",
}: ContributionFormProps) {
    const { query } = SearchStore();
    const router = useRouter();
    const {
        selectedTrack,
        setSelectedTrack,
    } = SearchStore();
    const [
        isLoading,
        setIsLoading,
    ] = useState(false);
    const [
        result,
        setResult,
    ] = useState<string>();
    const [
        email,
        setEmail,
    ] = useState("");
    const [
        error,
        setError,
    ] = useState("");

    const validateForm = () => {
        setError("");

        if (!selectedTrack) {
            setError("Elaba viezerik, je hebt nog geen lied gekozen.");

            return false;
        }

        if (!email) {
            setError("Elaba viezerik, je moet jouw e-mailadres nog invullen.");

            return false;
        }

        if (!validateEmail(email)) {
            setError("Elaba viezerik, jouw e-mailadres lijkt niet te kloppen.");

            return false;
        }

        return true;
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {
            setIsLoading(true);

            const data = await createProposal(selectedTrack!.id, email);

            if (data) {
                setResult(data);
                router.refresh();
            }
        } catch (error) {
            setError("Oeps, er liep iets mis. Wees gerust, het ligt niet aan jou maar aan onze vuile code.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedTrack) {
            setError("");
        }
    }, [selectedTrack]);

    useEffect(() => {
        if (result) {
            setSelectedTrack(null);
            setEmail("");
            shootConfetti(ConfettiTypes.HEARTS);
        }
    }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

    if (result) {
        return (
            <Success message="We hebben jouw vieze drop goed ontvangen! Het ingezonden degoutant kabaal wordt binnen de 27 werkdagen gereviewd.">
                <Button onClick={() => setResult(undefined)}>
                    Stel nog een vieze schijf voor
                </Button>
            </Success>
        );
    }

    return (
        <form
            noValidate
            className="mx-auto flex w-full max-w-md flex-col items-center self-stretch"
            onSubmit={onSubmit}
        >
            <Popover.Root open={!!query && !selectedTrack}>
                <SearchInput />

                <Suggestions accessToken={accessToken} />
            </Popover.Root>

            <Input
                className="mt-6"
                label="Jouw e-mailadres"
                name="email"
                placeholder="viezevuilegore@gmail.com"
                onChange={setEmail}
            />

            <Button
                className="mt-6"
                isLoading={isLoading}
                type="submit"
            >
                Versturen
            </Button>

            {error && (
                <p className="mt-4 max-w-prose text-center text-sm text-red-400">
                    {error}
                </p>
            )}
        </form>
    );
};