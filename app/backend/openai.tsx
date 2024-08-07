import { OpenAI } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function aiRecongition(image: any) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the image in one word" },
          { type: "image_url", image_url: { url: image, detail: "low" } },
        ],
      },
    ],
  });
  console.log(res.choices[0]);
  return res.choices[0];
}
