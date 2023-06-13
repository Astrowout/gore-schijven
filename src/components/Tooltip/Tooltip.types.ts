import { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

export interface ITooltipProps extends RadixTooltip.TooltipProps {
    children: ReactNode;
    content: ReactNode;
}