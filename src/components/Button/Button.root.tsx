import clsx from "clsx";
import Link from "next/link";

import { isExternalUrl } from "@/utils";

import { TButtonProps } from "./Button.types";

export default function ButtonRoot ({
    children = null,
    className = "",
    url = "",
    type = "button",
    isLoading = false,
    variant = "default",
    ...props
}: TButtonProps) {
    const classes = clsx("group relative inline-flex h-14 items-center justify-center rounded-full px-6 transition-colors duration-300", className, {
        "text-gray-400 hover:text-brand-light": variant === "default",
        "text-purple-200 hover:text-white": variant === "highlight",
    });

    if (url && isExternalUrl(url)) {
        return (
            <a
                className={classes}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                {...props}
            >
                {children}
            </a>
        );
    }

    if (url && !isExternalUrl(url)) {
        return (
            <Link
                className={classes}
                href={url}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            disabled={isLoading}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};
