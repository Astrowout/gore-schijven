import { Loader } from "@/components/Loader";
import { Proposals } from "@/components/Proposals";
import { INITIAL_PAGE } from "@/config";
import {
    ProposalVariants,
    TPageProps,
} from "@/types";

export default function AdminPage ({
    searchParams: {
        page = `${INITIAL_PAGE}`,
    },
}: TPageProps) {
    return (
        <>
            <Proposals
                page={Number(page) || 0}
                title="Gore drops van onze viezeriken"
                variant={ProposalVariants.Admin}
            />

            <Loader text="Sending feedback" />
        </>
    );
}
