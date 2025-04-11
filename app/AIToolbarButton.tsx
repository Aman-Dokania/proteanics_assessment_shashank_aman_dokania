// components/AIToolbarButton.tsx

import { getAIEdit } from "./api/editService";
import { Editor } from "@tiptap/core";

export default function AIToolbarButton({ editor }: { editor: Editor }) {
  const handleClick = async () => {
    if (!editor) return;

    const { from } = editor.state.selection;

    const userPrompt = window.prompt("What would you like to generate?");
    if (!userPrompt) return;

    try {
      const currentContent = editor.state.doc.textBetween(0, editor.state.doc.content.size, "\n");

      const prompt = `Insert content based on this instruction: "${userPrompt}". Respond with only the exact text to insert into the editor. No explanations, no markdown, no formatting — just the plain text.`;

      const generatedContent = await getAIEdit({
        text: currentContent,
        instruction: prompt,
      });

      // Clean up AI response just in case
      const cleanedContent = generatedContent
        .replace(/Modified Text:/i, "")
        .replace(/\*\*/g, "") 
        .trim();

      if (cleanedContent) {
        editor
          .chain()
          .focus()
          .insertContentAt(from, cleanedContent)
          .run();
      }
    } catch (error) {
      console.error("Content generation failed:", error);
      alert("Failed to generate content. Please try again.");
    }
  };

  return (
    <button
      className={`p-2 rounded-md transition ${
        editor.isActive("ai-edit")
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      }`}
      onClick={handleClick}
      title="Generate Content"
    >
      ✨ AI Generate
    </button>
  );
}
