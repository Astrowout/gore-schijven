import { LinkProps } from "next/link";

import { TComponent } from "@/types";

export type TButtonProps = TComponent & Partial<Pick<LinkProps, "replace" | "scroll">> & {
    url?: string;
    isLoading?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "default" | "highlight";
}