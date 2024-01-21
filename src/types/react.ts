import { ReactNode } from "react";

export type TComponent = {
    children?: ReactNode;
    className?: string;
}

export type TPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}