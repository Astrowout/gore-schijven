import {
    ProposalVariants,
    TComponent,
    TProposal,
} from "@/types";

export type ProposalProps = TComponent & TProposal & {
    variant: ProposalVariants;
};