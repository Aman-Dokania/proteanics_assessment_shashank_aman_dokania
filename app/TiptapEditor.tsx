
"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Placeholder } from "@tiptap/extension-placeholder";
import { SlashCommand } from "./extensions/SlashCommand"; 
import { Callout } from "./extensions/Callout"; 
import { useTheme } from "next-themes";

const TiptapEditor = () => {
  const { theme, setTheme } = useTheme(); 

  const COMMAND_ITEMS = [
    {
      title: "Heading 1",
      icon: "🔠",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: "Heading 2",
      icon: "🔡",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: "Heading 3",
      icon: "🔤",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      title: "Bold",
      icon: "B",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleBold().run(),
    },
    {
      title: "Italic",
      icon: "I",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleItalic().run(),
    },
    {
      title: "Bullet List",
      icon: "•",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleBulletList().run(),
    },
    {
      title: "Ordered List",
      icon: "1.",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleOrderedList().run(),
    },
    {
      title: "Blockquote",
      icon: "❝",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleBlockquote().run(),
    },
    {
      title: "Horizontal Rule",
      icon: "―",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: "Code Block",
      icon: "<>",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      title: "Callout",
      icon: "💡",
      command: ({ editor }: { editor: Editor }) =>
        editor.chain().focus().insertContent({
          type: "callout",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Type your content here",
                },
              ],
            },
          ],
        }).run(),
    },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
      heading: false,
      horizontalRule: false,
      codeBlock: false,
      
      }),
      Bold,
      Italic,
      Code,
      Blockquote,
      BulletList.configure({
      HTMLAttributes: { class: "list-disc pl-4" },
      }),
      OrderedList.configure({
      HTMLAttributes: { class: "list-decimal pl-4" },
      }),
      Placeholder.configure({
      placeholder: "Type '/' for commands",
      }),
      SlashCommand.configure({
      suggestion: {
        items: ({ query }: { query: string }) =>
        COMMAND_ITEMS.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
      },
      }),
      CodeBlock,
      Document,
      HardBreak,
      Heading.configure({
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "text-2xl font-bold",
      },
      }),
      Callout,
      HorizontalRule,
      ListItem,
      Paragraph,
      Text,
    ],
    content: `
      
      <h2>Welcome to your Tiptap editor!</h2>
      <p>Hello World</p>
      <blockquote>A blockquote example.</blockquote>
      <ul>
        <li>Bullet list item 1</li>
        <li>Bullet list item 2</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
      </ol>
      <pre><code class="language-javascript">console.log('Hello, world!');</code></pre>
      
      `,
    editorProps: {
      attributes: {
      class: "prose prose-lg mx-auto focus:outline-none mt-4", 
      },
      handleKeyDown: (view, event) => {
      if (event.key === "Enter" && event.shiftKey) {
        editor?.chain().focus().setHardBreak().run();
        return true;
      }
      return false;
      },
      handleDOMEvents: {
      click: () => {
        const placeholder = document.querySelector(
        ".ProseMirror p:first-child"
        );
        if (placeholder) {
        placeholder.textContent = "";
        }
      },
      },
    },
    });

  if (!editor) {
    return <div className="text-center text-gray-500">Loading editor...</div>;
  }

  return (
    <div className="min-h-screen transition-all">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end ">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Editor Container */}
      <div className="max-w-5xl mx-auto mt-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Toolbar */}
        <div className="flex flex-wrap space-x-1 mb-2">
          {/* Bold Button */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("bold")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </button>

          {/* Italic Button */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("italic")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Italic"
          >
            <em>I</em>
          </button>
            {/* Heading Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  className={`p-2 rounded-md transition ${
    editor.isActive('heading', { level: 2 })
      ? 'bg-blue-600 text-white'
      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-dark'
  }`}
  title="Heading Level 2"
>
  H2
</button>


          {/* Callout Button */}
          <button
            onClick={() => editor.chain().focus().setCallout().run()}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
            title="Add Callout"
          >
            Callout
          </button>

          {/* Bullet List Button */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("bulletList")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Bullet List"
          >
            •
          </button>

          {/* Ordered List Button */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("orderedList")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Ordered List"
          >
            1.
          </button>

          {/* Blockquote Button */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("blockquote")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Blockquote"
          >
            ❝
          </button>

          {/* Horizontal Rule Button */}
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            title="Horizontal Rule"
          >
            ―
          </button>

          {/* Code Block Button */}
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-md transition ${
              editor.isActive("codeBlock")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            title="Code Block"
          >
            {"<>"}
          </button>

          {/* Add New Line Button */}
          <button
            onClick={() => editor.chain().focus().insertContent("<p></p>").run()}
            className="p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
            title="Add New Line"
          >
            +
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-lg max-w-none focus:outline-none dark:prose-invert"
      />
    </div>
  );
};
export default TiptapEditor;