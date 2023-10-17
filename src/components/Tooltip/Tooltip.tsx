'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';

import { ITooltipProps } from './Tooltip.types';

export default function Tooltip({
    children,
    content,
}: ITooltipProps) {
    return (
        <RadixTooltip.Provider delayDuration={150}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    <span tabIndex={0}>
                        {children}
                    </span>
                </RadixTooltip.Trigger>

                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        align="start"
                        className="w-[var(--radix-tooltip-content-available-width)] max-w-xs select-none rounded-lg bg-white px-4 py-2 text-sm text-neutral-600 shadow-lg"
                        side="bottom"
                        sideOffset={4}
                    >
                        {content}

                        <RadixTooltip.Arrow className="fill-white" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};