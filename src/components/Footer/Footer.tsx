import { FooterProps } from './Footer.types';

export default function Footer({
    copyright = '',
    madeBy = '',
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center gap-y-4 pb-6 pt-28 text-center text-sm">
            <p className="text-neutral-500">
                {madeBy}
            </p>

            <p className="text-neutral-700">
                {/* eslint-disable-next-line react/jsx-newline */}
                ©

                {' '}

                {currentYear}

                {' '}

                {copyright}
            </p>
        </footer>
    );
};