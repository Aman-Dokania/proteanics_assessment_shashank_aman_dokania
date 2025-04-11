# ✨ AI Editing Features for Rich Text Editors
This project provides two AI-powered features for rich text editors using Tiptap:

- AI Inline Edit: Modify selected text with natural language instructions.
- AI Generate: Generate and insert new content based on a prompt.

Powered by Gemini 2.0 Flash API, these tools enhance user productivity and creativity directly inside the editor.

# 🚀 Features
## 🖊️ AI Inline Edit
- Let users select text and modify it using natural language instructions.
- ✂️ Select any text.
- 💬 Type how you'd like it edited (e.g., "make it formal", "fix grammar").
- 🤖 AI rewrites the text based on your instruction.

## ✨ AI Generate Button
- Insert AI-generated content based on a simple prompt.
- 🧠 Prompt the AI with something like “write a summary about climate change”.
- 📄 The AI generates text and inserts it into the editor at the cursor position.

##  📦 Components

| Component             | Description                                                   |
|-----------------------|---------------------------------------------------------------|
| `AIEditPanel.tsx`     | Modal interface for editing selected text using AI.           |
| `AIFloatingMenu.tsx`  | Floating UI that appears on text selection for inline AI editing. |
| `AIToolbarButton.tsx` | Toolbar button to trigger AI content generation.              |
| `editService.tsx`     | Handles communication with Gemini API.                        |
| `validation.tsx`      | Validates and repairs editor content based on ProseMirror schema. |
| `aiEditPlugin.tsx`     | ProseMirror plugin to support AI edit state |

## Environment Variables
Add your Gemini API key to ```.env.local```:

``` bash
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```
# Usage
## AI Edit Panel (Manual Integration)
```bash
<AIEditPanel
  initialText="Original text here"
  onApply={(newText) => console.log(newText)}
  onCancel={() => console.log("Edit cancelled")}
/>
```
## Inline Edit via Floating Menu
```bash
<AIFloatingMenu editor={editorInstance} />
```
## Generate Button in Toolbar
```bash
<AIToolbarButton editor={editorInstance} />
```
# 🧠 How It Works
- All features use a shared getAIEdit function.
- Requests are sent to Gemini 2.0 Flash using a clear instruction format.
- Response is parsed and injected directly into the editor.
```bash
Original Text: {text}
Edit Instruction: {instruction}
Modified Text:
```



