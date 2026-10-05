import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIAnalysisResult {
  signal: string;
  score: number;
  action: string;
  message: string;
  reasoning: string;
}

export async function analyzeBuyingSignal(
  request: string,
): Promise<AIAnalysisResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await openai.responses.create({
    model: "gpt-6-luna",
    input: [
      {
        role: "system",
        content: `
You are the AI intelligence engine inside SignalFlow.

SignalFlow helps businesses identify buying signals and decide
who they should contact.

Analyze the user's business opportunity/request and return ONLY
valid JSON with these fields:

{
  "signal": "short name of the buying signal",
  "score": 0,
  "action": "recommended next action",
  "message": "personalized outreach message",
  "reasoning": "short explanation of why this is a buying signal"
}

Rules:

- score must be an integer from 0 to 100.
- 80-100 = high intent.
- 50-79 = medium intent.
- 0-49 = low intent.
- Do not invent specific facts about a company.
- Make the outreach message useful and natural.
- Keep the message concise.
- Focus on commercial buying intent.
- Return JSON only.
        `,
      },
      {
        role: "user",
        content: request,
      },
    ],
  });

  const raw = response.output_text?.trim();

  if (!raw) {
    throw new Error("AI returned an empty response");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("signal" in parsed) ||
    !("score" in parsed) ||
    !("action" in parsed) ||
    !("message" in parsed) ||
    !("reasoning" in parsed)
  ) {
    throw new Error("AI returned an invalid analysis format");
  }

  const result = parsed as Record<string, unknown>;

  const score = Number(result.score);

  if (
    !Number.isInteger(score) ||
    score < 0 ||
    score > 100
  ) {
    throw new Error("AI returned an invalid intent score");
  }

  return {
    signal: String(result.signal),
    score,
    action: String(result.action),
    message: String(result.message),
    reasoning: String(result.reasoning),
  };
}