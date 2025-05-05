import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const randomPrompts = [
  "anime",
  "dreams",
  "travel",
  "food cravings",
  "music moods",
  "funny memories",
  "hobbies",
  "movie opinions",
  "weekend plans",
  "childhood nostalgia",
  "life goals",
  "bucket list",
  "book thoughts",
  "friendship",
  "creativity",
  "future tech",
  "superpowers",
  "hidden talents",
  "kindness",
  "pet peeves",
  "favorite season",
  "coding",
  "programming",
  "future goals",
  "books",
  "personal questions",
];

export async function GET() {
  try {
    const randomTheme =
      randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    const prompt = `Create a list of three unique and short question words range 10-15, open-ended, and engaging questions focusing on the theme of "${randomTheme}". Each question should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me. Avoid personal or sensitive topics, and ensure the questions encourage interaction, curiosity, and positivity.`;

    const result = await model.generateContent(prompt);

    return new Response(
      JSON.stringify({
        success: true,
        message: result.response.text(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error while generating the messages!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
