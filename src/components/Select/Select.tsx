"use client";

import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";

import { SelectProps } from "./Select.types";

export default function Select ({
    options = [],
    name = "",
    className = "",
    ...props
}: SelectProps) {
    return (
        <RadixSelect.Root {...props}>
            <RadixSelect.Trigger
                aria-label={name}
                className={clsx("inline-flex items-center justify-center gap-x-2 rounded-full border py-1.5 pl-5 pr-4 outline-none transition-colors focus:shadow-[0_0_0_2px] focus:shadow-black disabled:pointer-events-none disabled:cursor-not-allowed", className)}
            >
                <RadixSelect.Value placeholder="Select a status..." />

                <RadixSelect.Icon>
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            fillRule="evenodd"
                        />
                    </svg>
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Content
                align="start"
                className="relative z-40 overflow-hidden rounded-lg bg-white shadow-lg"
            >
                <RadixSelect.Viewport className="flex flex-col gap-y-1 p-2">
                    {options.map((option) => (
                        <RadixSelect.Item
                            key={option}
                            className="relative flex h-8 cursor-pointer items-center rounded-lg border border-transparent pl-8 pr-4 text-gray-900 data-[highlighted]:border-purple-200 data-[highlighted]:bg-purple-100 data-[state=checked]:bg-purple-100 data-[highlighted]:outline-none"
                            value={option}
                        >
                            <RadixSelect.ItemText>
                                {option}
                            </RadixSelect.ItemText>

                            <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-8 items-center justify-center">
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </RadixSelect.ItemIndicator>
                        </RadixSelect.Item>
                    ))}
                </RadixSelect.Viewport>
            </RadixSelect.Content>
        </RadixSelect.Root>
    );
};