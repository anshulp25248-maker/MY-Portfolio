import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Please provide resume or experience text to rewrite." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error:
        "ANTHROPIC_API_KEY is not configured. Add it to your environment to enable Claude resume rewriting.",
    });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1800,
      system:
        "You are an expert executive resume writer specializing in finance, investment banking, and management consulting. Rewrite the provided content using powerful action verbs, quantified achievements, and language that would impress a hiring manager at Goldman Sachs or McKinsey. Format as crisp bullet points. Maintain accuracy — do not invent facts.",
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: `Claude API request failed with status ${response.status}.` }, { status: 502 });
  }

  const data = await response.json();
  const output = data.content?.map((block: { type: string; text?: string }) => (block.type === "text" ? block.text : "")).join("\n");

  return NextResponse.json({ output });
}
