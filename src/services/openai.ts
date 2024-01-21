import { PROMPTS } from "@/config";
import { Status } from "@/types";

const OPENAI_MODEL = "gpt-3.5-turbo"; // Powerful but still cost-effective model

export async function generateFeedback (status: Status) {
    const res = await fetch(`${process.env.OPENAI_API_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            "model": OPENAI_MODEL,
            "messages": [
                {
                    role: "user",
                    content: status === Status.APPROVED ? PROMPTS.APPROVED : PROMPTS.REJECTED,
                },
            ],
            "max_tokens": 64,
        }),
    });
    const data = await res.json();

    if (data.choices) {
        return data.choices[0].message.content;
    } else if (data.error) {
        return new Error (data.error.message);
    }
}