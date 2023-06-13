import {
	IFeedbackEmailData,
	Status,
} from '@/types';

export type AdminProposalProps = {
    notionPageId: string;
    likes: number;
    url: string;
    status: Status;
    createdTime: string;
    metadata: IFeedbackEmailData;
}