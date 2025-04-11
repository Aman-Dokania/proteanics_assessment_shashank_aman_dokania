
interface EditRequest {
    text: string;
    instruction: string;
  }
  
  export async function getAIEdit({
    text,
    instruction,
  }: EditRequest): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
    if (!apiKey) {
      throw new Error("Missing Gemini API key");
    }
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Original Text: ${text}\nEdit Instruction: ${instruction}\nModified Text:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      console.error("Gemini API call failed:", error);
      throw error;
    }
  }
  