import { ReactNode } from "react";

import { Status } from "@/types";

export type StatusTagProps = {
    children: ReactNode;
    className?: string;
    status: Status;
}