import { FooterProps } from "./Footer.types";

export default function Footer({
    copyright = "",
    madeBy = "",
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-5 pt-28 pb-6 text-sm text-center flex flex-col items-center gap-y-4">
            <p className="text-neutral-500">
                { madeBy }
            </p>

            <p className="text-neutral-700">
                © { currentYear } { copyright }
            </p>
        </footer>
    );
};