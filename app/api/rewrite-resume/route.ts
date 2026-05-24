import { NextResponse } from "next/server";

const model = "gemini-2.5-flash";

export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Please provide resume or experience text to rewrite." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error:
        "GEMINI_API_KEY is not configured. Add it in Vercel environment variables to enable Gemini 2.5 Flash resume rewriting.",
    });
  }

  const prompt = `You are a senior finance recruiter who reviews 200+ MBA resumes daily. You can reject a resume instantly if it has weak bullets, vague claims, poor grammar, inflated language, missing impact, or unclear finance relevance.

Your task: rewrite the user's raw resume content into a finance-focused MBA resume that can score 9.5/10 with recruiters for equity research, investment banking, asset management, private equity, AIF research, corporate finance, and management consulting roles.

Rules:
- Create crisp, high-impact bullet points only.
- Use powerful action verbs such as analyzed, evaluated, structured, modelled, screened, benchmarked, quantified, synthesized, optimized, led, built, validated, and presented.
- Keep every bullet truthful. Do not invent companies, numbers, certifications, outcomes, tools, or awards.
- Preserve all provided metrics and make them sharper.
- Make bullets outcome-oriented, recruiter-readable, and ATS-friendly.
- Prioritize finance language: valuation, DCF, WACC, ERP, cost of equity, creditworthiness, leverage, cash-flow sustainability, market sizing, investment thesis, sector benchmarking, capital allocation, risk assessment.
- Remove weak phrasing, filler, repetition, and generic student language.
- If a bullet lacks measurable impact, rewrite it to emphasize scope, analytical method, and decision-usefulness without inventing results.
- Output sections suitable for an MBA finance resume: Professional Summary, Core Finance Skills, Experience Bullets, Research & Models, Education Highlights.
- The tone should impress a senior recruiter while remaining precise, credible, and polished.

Raw content:
${content}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          topP: 0.9,
          maxOutputTokens: 2200,
        },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json({ error: `Gemini API request failed with status ${response.status}.` }, { status: 502 });
  }

  const data = await response.json();
  const output = data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("\n");

  return NextResponse.json({ output: output || "No rewrite output received from Gemini." });
}
