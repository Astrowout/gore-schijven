import {
    ProposalVariants,
    TComponent,
} from "@/types";

export type TMoreProposalsProps = TComponent & {
    totalCount: number;
    variant: ProposalVariants;
};