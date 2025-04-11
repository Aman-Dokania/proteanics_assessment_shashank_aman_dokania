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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const modifiedText = await getAIEdit({
        text: initialText,
        instruction
      });
      onApply(modifiedText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-edit-panel">
      <textarea
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="How should this text be modified?"
      />
      <div className="button-group">
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Processing..." : "Apply Changes"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
