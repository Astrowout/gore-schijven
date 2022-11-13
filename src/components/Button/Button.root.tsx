import { ButtonProps } from "./Button.types";

export default function ButtonRoot({
    link = "",
    type = "button",
    isLoading = false,
    onClick = () => null,
    children = null,
}: ButtonProps) {
    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
            >
                { children }
            </a>
        )
    }

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={isLoading}
        >
            { children }
        </button>
    );
};
