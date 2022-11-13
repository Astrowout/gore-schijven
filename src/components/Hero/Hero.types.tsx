import { ReactNode } from "react";

export type HeroProps = {
    title: string;
    description: string;
    children?: ReactNode;
}