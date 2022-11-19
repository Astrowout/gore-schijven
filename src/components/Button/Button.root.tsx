import { ButtonProps } from "./Button.types";

export default function ButtonRoot({
    children = null,
    className = "",
    link = "",
    type = "button",
    isLoading = false,
    onClick = () => null,
}: ButtonProps) {
    const classes = `${className} inline-flex`;
    
    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
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
            className={classes}
        >
            { children }
        </button>
    );
};
