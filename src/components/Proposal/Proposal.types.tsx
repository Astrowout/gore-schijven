export type ProposalProps = {
    notionPageId: string;
    likes: number;
    url: string;
    status: 'To be reviewed' | 'Approved' | 'Rejected';
    createdTime: string;
}