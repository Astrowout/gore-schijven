import { ContributionProps } from "./Contribution.types";

export default function Contribution ({
    title = "",
    description = "",
    children = null,
}: ContributionProps) {
    return (
        <section className="l-section flex flex-col items-center gap-y-6">
            <header className="flex max-w-prose flex-col items-center gap-y-2 text-center">
                <h1 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                    {title}
                </h1>

                <p className="text-gray-500">
                    {description}
                </p>
            </header>

            {children}
        </section>
    );
};