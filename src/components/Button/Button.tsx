import clsx from "clsx";

import ButtonRoot from "./Button.root";
import { TButtonProps } from "./Button.types";

export default function Button ({
    children,
    variant = "default",
    ...props
}: TButtonProps) {
    return (
        <ButtonRoot
            {...props}
            variant={variant}
        >
            <span
                className={clsx("absolute inset-0 size-full rounded-full border shadow-lg transition duration-500 sm:group-hover:scale-105 sm:group-hover:shadow-xl sm:group-hover:shadow-purple-500/20", {
                    "border-neutral-700 bg-gray-900 sm:group-hover:border-brand-light": variant === "default",
                    "border-brand-light bg-brand sm:group-hover:border-brand": variant === "highlight",
                })}
            />

            <span className="relative z-10 flex items-center gap-x-2 transition-transform duration-300 sm:group-hover:scale-110">
                {children}

                {props.isLoading && (
                    <svg
                        className="size-4 animate-spin text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />

                        <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                        />
                    </svg>
                )}
            </span>
        </ButtonRoot>
    );
};
