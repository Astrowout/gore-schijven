import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

import { getArtistsLine } from "../../../helpers/format";

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).send("Method not allowed. Only POST method is allowed.");
    }

    try {
        const result = await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id": process.env.NOTION_DATABASE_ID as string,
            },
            "properties": {
                "Title": {
                    "title": [
                        {
                            "type": "text",
                            "text": {
                                "content": req.body.name
                            }
                        }
                    ]
                },
                "Artist": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": getArtistsLine(req.body.artists),
                            }
                        }
                    ]
                },
                "Spotify URL": {
                    "url": req.body.external_urls.spotify,
                },
                "Email contributor": {
                    "email": req.body.email,
                },
                "Status": {
                    "status": {
                        "name": "To be reviewed"
                    }
                },
                "Created at": {
                    "date": {
                        "start": new Date().toISOString(),
                        "time_zone": "Europe/Brussels"
                    }
                },
            },
        });
        
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(JSON.stringify(error));
    }
}