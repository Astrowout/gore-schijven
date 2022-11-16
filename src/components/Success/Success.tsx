import { SuccessProps } from "./Success.types";

export default function Success({
    children,
    message = "",
}: SuccessProps) {
    return (
        <div className="py-4 max-w-md text-center flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <p className="text-white leading-relaxed mt-3">
                { message }
            </p>

            <div className="mt-6">
                { children }
            </div>
        </div>
    );
};