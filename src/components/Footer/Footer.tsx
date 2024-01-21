import Link from "next/link";

import { Routes } from "@/types";

import { FooterProps } from "./Footer.types";

export default function Footer ({
    copyright = "",
    madeBy = "",
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center gap-y-4 pb-6 pt-28 text-center">
            <p className="text-base text-gray-500">
                {madeBy}
            </p>

            <Link
                className="rounded border border-gray-800 bg-ui-dark px-3 py-1 text-sm text-gray-600 transition-colors hover:border-gray-600 hover:text-gray-500"
                href={Routes.Admin}
            >
                Admin login
            </Link>

            <p className="text-sm text-gray-700">
                {/* eslint-disable-next-line react/jsx-newline */}
                ©

                {" "}

                {currentYear}

                {" "}

                {copyright}
            </p>
        </footer>
    );
};