import { generateDesignIdeas } from "@/config/aimodel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    const result = await generateDesignIdeas(prompt);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ error: e.message || "Internal server error" }, { status: 500 });
  }
}

