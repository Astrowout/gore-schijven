import { ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}