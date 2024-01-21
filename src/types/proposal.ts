import { TAlbumCover } from "./album";
import { Status } from "./status";

export type TProposal = {
    id: string;
    title: string;
    artist: string;
    likes: number;
    dislikes: number;
    spotifyUrl: string;
    feedback: string;
    email: string;
    status: Status;
    createdTime: string;
    albumCoverPreviewUrl: string;
    albumCover: TAlbumCover;
    previewUrl?: string;
}

export enum ProposalVariants {
    Base = "base",
    Admin = "admin",
}