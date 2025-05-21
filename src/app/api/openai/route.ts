import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});

export async function POST(req: Request) {
  try {
    const { title, role } = await req.json();
    console.log(title);
    console.log(role);
    

    const aiResponse = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          // content: `Create small blog post with html tags based on this title: ${title}`,
          content: `Create 3 line blog post with html tags based on this title: ${title}`,
        },
        {
          role: "developer",
          content: `${
            role || "I am a helpful assistant"
          }, Write with html tags.`,
        },
      ],
    });

    return NextResponse.json(
      {
        content: aiResponse.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
