import { ProposalProps } from "./Proposal.types";

export default function Proposal({
    title = "",
    description = "",
    children = null,
}: ProposalProps) {
    return (
        <section className="flex flex-col items-center py-10 sm:py-12 px-5 gap-y-8">
            <header className="text-center max-w-prose flex flex-col items-center gap-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
                    { title }
                </h1>

                <p className="text-neutral-500">
                    { description }
                </p>
            </header>

            { children }
        </section>
    );
};