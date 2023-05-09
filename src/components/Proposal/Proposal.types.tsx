export type ProposalProps = {
    likes: number;
    url: string;
    status: 'To be reviewed' | 'Approved' | 'Rejected';
    createdTime: string;
}