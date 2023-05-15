import { Status } from '@/types';

export type ProposalProps = {
    notionPageId: string;
    likes: number;
    url: string;
    status: Status;
    createdTime: string;
}