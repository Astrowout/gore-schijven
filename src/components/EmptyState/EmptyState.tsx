import { EmptyStateProps } from "./EmptyState.types";

export default function EmptyState ({
    message = "",
    icon = null,
}: EmptyStateProps) {
    return (
        <div className="flex max-w-prose flex-col items-center gap-y-3 px-4 py-8 text-center">
            {icon ? (
                icon
            ) : (
                <svg
                    className="size-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}

            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    );
};