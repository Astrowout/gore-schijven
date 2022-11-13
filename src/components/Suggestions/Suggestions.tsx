import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import EmptyState from "../EmptyState/EmptyState";
import Player from "../Player/Player";
import Track from "../Track/Track";
import { SuggestionsProps } from "./Suggestions.types";

export default function Suggestions({
    results = [],
    isLoading = false,
}: SuggestionsProps) {
    return (
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="absolute top-full mt-2 max-h-80 w-full overflow-y-auto rounded-xl bg-neutral-900 border border-neutral-600 shadow-xl divide-y divide-neutral-800">
                {!results.length ? (
                    <EmptyState title={isLoading ? "Bezig met zoeken..." : "Geen resultaten gevonden"} />
                ) : (
                    <Combobox.Options>
                        {results.map((item: any) => (
                            <Combobox.Option
                                key={item.id}
                                value={item}
                                className="flex w-full px-3 py-3 gap-x-3 items-center hover:bg-neutral-800 cursor-pointer"
                            >
                                <Player
                                    id={item.id}
                                    preview={item.preview_url}
                                />
            
                                <Track
                                    album={item.album}
                                    name={item.name}
                                    artists={item.artists}
                                />
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Transition>
    );
};