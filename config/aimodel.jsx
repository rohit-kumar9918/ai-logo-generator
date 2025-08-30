import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_JS_API_KEY;
if (!apiKey) {
  throw new Error("❌ Missing NEXT_JS_API_KEY in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemma-3-1b-it",
});

export async function generateDesignIdeas(prompt) {
  try {
    console.log("Generating content with Gemini API for prompt:", prompt);
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 1 },
    });

    let text = result.response.text();
    console.log("🤖 Raw Gemini response:", text);

    // Remove all ```json
    text = text.replace(/```json\s*|\s*```/g, '').trim();

    let ideas = [];

    try {
      // Attempt to parse the cleaned text as JSON
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        ideas = parsed.map((item) => 
          typeof item === 'object' && item.description ? item.description : item
        );
      } else if (parsed.ideas) {
        ideas = parsed.ideas.map((item) =>
          typeof item === 'object' && item.description ? item.description : item
        );
      }
    } catch (parseError) {
      console.log("JSON parsing failed, falling back to text parsing:", parseError);
      ideas = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          try {
            const parsedLine = JSON.parse(line);
            return Array.isArray(parsedLine) ? parsedLine : [parsedLine];
          } catch (e) {
            return line.replace(/^[-*]\s*[\d.]+\.\s*/, "").trim();
          }
        })
        .flat() 
        .slice(0, 5);
    }

    return { ideas };
  } catch (error) {
    console.error("Error in generateDesignIdeas:", error);
    throw new Error("Failed to generate design ideas: " + error.message);
  }
}

export async function AIlogoPrompt(prompt) {
  try {
    console.log("🎨 Generating logo prompt with Gemini API:", prompt);

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8 },
    });
    let text = response.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json\s*|\s*```/g, "").trim();
    let cleanPrompt;
    try {
      const parsed = JSON.parse(text);
      cleanPrompt = parsed.prompt || text; 
    } catch {
      cleanPrompt = text;
    }

    return { prompt: cleanPrompt }; 
  } catch (error) {
    console.error("Error in AIlogoPrompt:", error);
    throw new Error("Failed to generate AI logo prompt: " + error.message);
  }
}
