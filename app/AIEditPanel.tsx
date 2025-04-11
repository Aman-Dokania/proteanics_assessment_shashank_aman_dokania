// components/AIEditPanel.tsx
import { useState } from 'react';
import { getAIEdit } from './api/editService';

export default function AIEditPanel({ 
  initialText,
  onApply,
  onCancel 
}: {
  initialText: string;
  onApply: (modifiedText: string) => void;
  onCancel: () => void;
}) {
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!instruction.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const fullInstruction = `Based on this instruction: "${instruction}", update the text accordingly. Respond with only the modified text, without any explanation, formatting, or commentary.`;

      const modifiedText = await getAIEdit({
        text: initialText,
        instruction: fullInstruction,
      });

      const cleanedText = modifiedText
        .replace(/Modified Text:/i, "")
        .replace(/\*\*/g, "")
        .trim();

      onApply(cleanedText);
    } catch (err) {
      console.error("AI editing failed:", err);
      setError("Something went wrong while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-edit-panel space-y-3 p-4 border rounded-md bg-white dark:bg-gray-900">
      <textarea
        className="w-full min-h-[100px] p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="How should this text be modified?"
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Apply Changes"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
