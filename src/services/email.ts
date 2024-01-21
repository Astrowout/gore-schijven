import { Status } from "@/types";

export type TEmailMetadata = {
    songTitle: string;
	songArtist: string;
	feedback: string;
	user_email: string;
}

export async function sendEmail (status: Status, metadata: TEmailMetadata) {
    const res = await fetch(`${process.env.SPARKPOST_API_URL}/transmissions`, {
        method: "POST",
        headers: {
            "Authorization": process.env.SPARKPOST_API_KEY!,
        },
        body: JSON.stringify({
            "content": {
                "template_id": status === Status.APPROVED ? "proposal-approved" : "proposal-rejected",
            },
            "substitution_data": {
                songTitle: metadata.songTitle,
                songArtist: metadata.songArtist,
                feedback: metadata.feedback,
            },
            "recipients": [
                {
                    "address": {
                        "email": metadata.user_email,
                    },
                },
            ],
        }),
    });
    const data = await res.json();

    if (data.errors) {
        return new Error(data.errors[0].message);
    }

    return {
        success: true,
    };
};