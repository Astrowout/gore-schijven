import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export interface ITooltipProps extends RadixTooltip.TooltipProps {
    children: ReactNode;
    content: ReactNode;
}