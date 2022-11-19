import { ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}