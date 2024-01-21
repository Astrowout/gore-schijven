import {
    ProposalVariants,
    TComponent,
} from "@/types";

export type TMoreProposalsProps = TComponent & {
    page: number;
    count: number;
    totalCount: number;
    variant: ProposalVariants;
};