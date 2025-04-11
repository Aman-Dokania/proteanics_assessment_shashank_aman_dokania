// components/AIFloatingMenu.tsx
import React, { useState, useEffect } from "react";
import { getAIEdit } from "./api/editService";
import { Editor } from "@tiptap/core";
export default function AIFloatingMenu({ editor }: { editor: Editor }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      setVisible(false);
      return;
    }

    const coords = editor.view.coordsAtPos(to);
    setPosition({ x: coords.left, y: coords.bottom + 10 });
    setVisible(true);
  }, [editor, editor?.state.selection]);

  const handleAIEdit = async () => {
    setIsLoading(true);
    try {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);

      const modifiedText = await getAIEdit({
        text,
        instruction,
      });

      editor.chain()
        .focus()
        .insertContentAt({ from, to }, modifiedText)
        .run();

      setVisible(false); 
    } catch (error) {
      console.error("AI Edit failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return visible ? (
    <div
      className="absolute z-50 bg-white border rounded shadow-lg p-4"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, 0%)",
      }}
    >
      <textarea
        className="w-64 h-24 border rounded p-2"
        placeholder="Enter instructions for AI edit..."
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        disabled={isLoading}
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleAIEdit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Apply"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
}
