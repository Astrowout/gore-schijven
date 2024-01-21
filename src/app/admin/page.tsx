import { Loader } from "@/components/Loader";
import { Proposals } from "@/components/Proposals";
import { ProposalVariants } from "@/types";

export default function AdminPage () {
    return (
        <>
            <Proposals
                title="Gore drops van onze viezeriken"
                variant={ProposalVariants.Admin}
            />

            <Loader text="Sending feedback" />
        </>
    );
}
