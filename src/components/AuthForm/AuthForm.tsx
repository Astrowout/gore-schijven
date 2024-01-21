"use client";

import {
    FormEvent,
    useState,
} from "react";

import { Button } from "@/components/Button";
import { useAuth } from "@/hooks";

import { AuthFormProps } from "./AuthForm.types";

export default function AuthForm ({}: AuthFormProps) {
    const {
        isLoading,
        handleLogin,
    } = useAuth();
    const [
        password,
        setPassword,
    ] = useState("");
    const [
        error,
        setError,
    ] = useState("");

    const validateForm = () => {
        setError("");

        if (!password) {
            setError("Elaba viezerik, je hebt geen paswoord ingevuld.");

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
            await handleLogin(password);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <form
            noValidate
            className="mx-auto flex w-full max-w-sm flex-col"
            onSubmit={onSubmit}
        >
            <label
                className='text-center text-lg text-white'
                htmlFor="password"
            >
                Vul jouw paswoord in
            </label>

            <input
                className="mt-3 h-14 w-full appearance-none rounded-full border border-neutral-700 bg-gray-800 px-6 text-center text-xl text-white shadow-inner placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                className="mt-6"
                isLoading={isLoading}
                type="submit"
            >
                Login
            </Button>

            {error && (
                <p className="mt-4 max-w-prose text-center text-sm text-red-400">
                    {error}
                </p>
            )}
        </form>
    );
};