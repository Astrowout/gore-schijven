import { THeroProps } from "./Hero.types";

export default function Hero ({
    children,
    description = "",
}: THeroProps) {
    return (
        <section className="l-section--sm flex flex-col items-center gap-y-5 sm:gap-y-6 lg:gap-y-7">
            {description && (
                <p className="max-w-prose text-center text-gray-500">
                    {description}
                </p>
            )}

            <div className="mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3">
                {children}
            </div>
        </section>
    );
};