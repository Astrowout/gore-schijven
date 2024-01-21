import { formatRelative } from "date-fns";
import { nl } from "date-fns/locale";

import {
    Status,
    TProposal,
    TTrackDto,
} from "@/types";
import { TProposalDto } from "~/db/schema/proposals";

export const getArtistsLine = (artists: TTrackDto["artists"]) => {
    let line = "";

    for (let i = 0; i < artists.length; i++) {
        const artist = artists[i];

        if (i > 0) {
            line += `, ${artist.name}`;
        } else {
            line += artist.name;
        }
    }

    return line;
};

export const formatProposal = (proposal: TProposalDto, track: TTrackDto): TProposal => {
    const {
        id,
        name,
        artists,
        album,
        external_urls,
    } = track;

    const previewImage = album.images[2] || album.images[1] || album.images[0];

    return {
        id,
        title: name,
        artist: getArtistsLine(artists),
        albumCover: album.images[1] || album.images[0],
        albumCoverPreviewUrl: previewImage.url,
        spotifyUrl: external_urls.spotify,
        likes: proposal.likes || 0,
        feedback: proposal.feedback || "",
        dislikes: proposal.dislikes || 0,
        email: proposal.email,
        status: proposal.status as Status || Status.TO_BE_REVIEWED,
        createdTime: proposal.createdAt ? formatRelative(new Date(proposal.createdAt), new Date(), { locale: nl }) : formatRelative(new Date(), new Date(), { locale: nl }),
        previewUrl: track.preview_url,
    };
};