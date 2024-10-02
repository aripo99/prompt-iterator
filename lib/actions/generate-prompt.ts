"use server";

import OpenAI from "openai";
const openai = new OpenAI();

const SYSTEM_PROMPT = "You are a professional prompt engineer whose sole goal is to write prompts for another LLM. Just write the prompt, don't add anything else to your message";

export async function generatePrompt(messages: Array<{ role: string; content: string }>) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
        ],
    });
    console.log(completion.choices);
    return completion.choices[0].message.content || "";
}